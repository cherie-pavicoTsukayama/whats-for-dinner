require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const fetch = require('node-fetch');
const app = express();
const crypto = require('crypto');

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
  if (!req.body.location) {
    res.status(400).json({
      error: 'Location is a required field. Please input city or zip.'
    });
    return;
  }
  if (!req.body.category) {
    res.status(400).json({
      error: 'Category is a required field'
    });
    return;
  }
  if (!req.body.radius) {
    res.status(400).json({
      error: 'Distance is a required field'
    });
    return;
  }
  if (!req.body.price) {
    res.status(400).json({
      error: 'Price is a required field. Please enter number values 1-4'
    });
    return;
  }
  if (!req.session.userId) {
    const makeUserIdSql = `
    insert into "users" ("userId")
      values (default)
      returning *
      ;
    `;
    db.query(makeUserIdSql)
      .then(resultUser => {
        req.session.userId = resultUser.rows[0].userId;
      })
      .catch(err => next(err));
  }

  const options = {
    method: 'GET',
    headers: {
      Authorization: process.env.YELP_KEY,
      'Content-Type': 'application/json'
    }
  };

  fetch('https://api.yelp.com/v3/businesses/search?term=burgers&location=92612&limit=10', options)
    .then(response => response.json())
    .then(data => {
      const bytes = crypto.randomBytes(4).toString('hex');

      const params = [data, bytes, true, req.session.userId];
      const makeRoomSql = `
      insert into "rooms" ("roomId", "restaurants", "entryKey", "isActive", "userId")
      values (default, $1, $2, $3, $4)
      returning "restaurants", "roomId", "entryKey", "isActive", "userId"
      ;`;
      db.query(makeRoomSql, params)
        .then(result1 => {
          console.log(result1.rows[0]);
          req.session.roomId = result1.rows[0].roomId;
          res.status(200).json(result1.rows[0]);
        });
    })
    .catch(err => next(err));
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
