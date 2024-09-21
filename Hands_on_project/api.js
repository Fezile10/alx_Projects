xpress = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();

const dbUrl = 'mongodb+srv://fezilemnikazi:37uPvYdTE0KU97vT@handson.maaqp.mongodb.net/?retryWrites=true&w=majority&appName=HandsOn';
const dbName = 'HandsOn';

MongoClient.connect(dbUrl, (err, client) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to database');

    const db = client.db(dbName);
    const boardsCollection = db.collection('boards');
    const columnsCollection = db.collection('columns');
    const cardsCollection = db.collection('cards');

    app.get('/api/boards', async (req, res) => {
      const boards = await boardsCollection.find().toArray();
      res.json(boards);
    });

    app.get('/api/columns/:boardId', async (req, res) => {
      const boardId = req.params.boardId;
      const columns = await columnsCollection.find({ boardId }).toArray();
      res.json(columns);
    });

    app.get('/api/cards/:columnId', async (req, res) => {
      const columnId = req.params.columnId;
      const cards = await cardsCollection.find({ columnId }).toArray();
      res.json(cards);
    });
