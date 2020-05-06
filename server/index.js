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
      });
  }

  const options = {
    method: 'GET',
    headers: {
      Authorization: process.env.YELP_KEY,
      'Content-Type': 'application/json'
    }
  };

  fetch('https://api.yelp.com/v3/businesses/search?term=burgers&location=irvine', options)
    .then(response => response.json())
    .then(data => {

      let token;
      crypto.randomBytes(4, function (err, buffer) {
        token = buffer.toString('hex');
      });
      const params = [data, token, true, req.session.userId];
      const makeRoomSql = `
      insert into "rooms" ("roomId", "restaurants", "entryKey", "isActive", "userId")
      values (default, $1, $2, $3, $4)
      returning "roomId"
      ;`;
      db.query(makeRoomSql, params)
        .then(result1 => {
          console.log(result1.rows[0]);
          req.session.roomId = result1.rows[0].roomId;
        });
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
