require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const fetch = require('node-fetch');
const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/rooms/:entryKey', (req, res, next) => {
  const { entryKey } = req.params;
  const getRoom = `
    select "restaurants",
           "roomId"
      from "rooms"
     where "entryKey" = $1
  `;

  const value = [entryKey];
  db.query(getRoom, value)
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});
app.get('/api/create-room', (req, res, next) => {
  console.log('hit');
  // first thing should validate that all form data was sent
  // authorization key should be hidden in env
  const options = {
    method: 'GET',
    headers: {
      Authorization: process.env.YELP_KEY,
      'Content-Type': 'application/json'
    }
  };
  // consider adding bearer here
  // fetch would use {$req.body.city} etc...
  fetch('https://api.yelp.com/v3/businesses/search?term=burgers&location=irvine', options)
    .then(response => response.json())
    .then(data => {
      res.json(data);
    });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
