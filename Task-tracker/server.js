re('dotenv').config();
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const saltRounds = 10;
const port = 3000;

// Initialize the database connection and create the tasks table
const db = new sqlite3.Database('todo.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task TEXT NOT NULL,
            status INTEGER NOT NULL DEFAULT 0
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            email TEXT UNIQUE,
            password TEXT
        )`);
    }
});

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback-secret',
    resave: false,
    saveUninitialized: true,
}));

// Register API
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) return res.status(500).send('Error hashing password');
        db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
               [username, email, hashedPassword], (err) => {
            if (err) return res.status(500).send('Error registering user');
            res.sendStatus(200);
        });
    });
});

// Login API
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if (err || !user) return res.status(400).send('User not found');
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                req.session.user = { id: user.id, username: user.username, email: user.email };
                res.sendStatus(200);
            } else {
                res.status(400).send('Incorrect password');
            }
        });
    });
});

// API to add a task
app.post('/api/add', (req, res) => {
    const { task } = req.body;
    db.run("INSERT INTO tasks (task, status) VALUES (?, 0)", [task], function(err) {
        if (err) {
            res.status(500).send('Error adding task.');
        } else {
            res.status(200).send(`Task '${task}' added.`);
        }
    });
});

// API to mark a task as done
app.post('/api/done', (req, res) => {
    const { task } = req.body;
    db.run("UPDATE tasks SET status = 1 WHERE task = ?", [task], (err) => {
        if (err) {
            res.status(500).send('Error marking task as done.');
        } else {
            res.status(200).send(`Task '${task}' marked as done.`);
        }
    });
});

// API to remove a task
app.post('/api/remove', (req, res) => {
    const { task } = req.body;
    db.run("DELETE FROM tasks WHERE task = ?", [task], (err) => {
        if (err) {
            res.status(500).send('Error removing task.');
        } else {
            res.status(200).send(`Task '${task}' removed.`);
        }
    });
});

// API to fetch all tasks
app.get('/api/tasks', (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) {
            res.status(500).send('Error fetching tasks.');
        } else {
            res.json(rows);
        }
    });
});

// API to get progress of tasks
app.get('/api/progress', (req, res) => {
    db.get("SELECT COUNT(*) AS total FROM tasks", [], (err, totalRow) => {
        if (err) {
            res.status(500).send('Error fetching total task count.');
            return;
        }
        
        db.get("SELECT COUNT(*) AS completed FROM tasks WHERE status = 1", [], (err, completedRow) => {
            if (err) {
                res.status(500).send('Error fetching completed task count.');
                return;
            }
            
            const total = totalRow.total;
            const completed = completedRow.completed;
            const progress = total === 0 ? 0 : (completed / total) * 100;

            res.json({ total, completed, progress });
        });
    });
});


// Serve the static HTML, CSS, and JavaScript files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)

});
