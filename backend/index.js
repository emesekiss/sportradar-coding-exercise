import express from 'express';
import cors from 'cors';
import {
  getEvents,
  deleteEvent,
  addEvent,
  filterEvents,
  getSports,
} from './database.js';

const app = express();
const port = 3001;

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers',
  );
  next();
});

app.get('/', async (req, res) => {
  try {
    const response = await getEvents();
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/sports', async (req, res) => {
  try {
    const response = await getSports();
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/:filter', async (req, res) => {
  try {
    const response = await filterEvents(req.params.filter);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.options('/events', cors());
app.post('/events', cors(), async (req, res) => {
  try {
    const response = await addEvent(req.body);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.options('/events/:id', cors());
app.delete('/events/:id', cors(), async (req, res) => {
  try {
    const response = await deleteEvent(req.params.id);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
