const apiUrl = '/api/tasks';
const progressUrl = '/api/progress';

// Function to update the progress bar
async function updateProgress() {
    try {
        const response = await fetch(progressUrl);
        if (!response.ok) {
            throw new Error('Error fetching progress');
        }
        const { progress } = await response.json();
        const progressBar = document.getElementById('progressBar');
        progressBar.style.width = `${progress}%`;
        progressBar.innerText = `${Math.round(progress)}% Completed`;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
    if (task) {
        await fetch('/api/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task })
        });
        taskInput.value = '';
        viewTasks();
        updateProgress();
    }
}

async function viewTasks() {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = tasks.map(task => `
        <li class="${task.status === 1 ? 'completed' : ''}">
                ${task.task} 
                <button onclick="markTaskDone('${task.task}')">Mark as Done</button>
                <button onclick="removeTask('${task.task}')">Remove</button>
            </li>
    `).join('');
    updateProgress();
}

async function markTaskDone(task) {
    await fetch('/api/done', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task })
    });
    viewTasks();
    updateProgress();
}

async function removeTask(task) {
    await fetch('/api/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task })
    });
    viewTasks();
    updateProgress();
}
document.getElementById('loginToggle').addEventListener('click', function () {
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('registerForm').classList.remove('active');
    this.classList.add('active');
    document.getElementById('registerToggle').classList.remove('active');
});

document.getElementById('registerToggle').addEventListener('click', function () {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('registerForm').classList.add('active');
    this.classList.add('active');
    document.getElementById('loginToggle').classList.remove('active');
});

// Handling form submission for login
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        window.location.href = 'profile.html';
    } else {
        alert('Login failed');
    }
});

// Handling form submission for registration
document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });

    if (response.ok) {
        alert('Registration successful! Please log in.');
        document.getElementById('loginToggle').click();  // Switch to login form
    } else {
        alert('Registration failed');
    }
});

