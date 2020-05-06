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
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(`cannot find room corresponding to 'entryKey': ${entryKey}`, 400);
      } else if (!req.session.userId) {
        const createUserIdSql = `
        insert into "users" ("userId")
        values (default)
        returning *
        `;
        return (
          db.query(createUserIdSql)
            .then(result2 => {
              return {
                userId: result2.rows[0].userId,
                roomId: result.rows[0].roomId,
                restaurants: result.rows[0].restaurants
              };
            })
        );
      } else {
        return {
          userId: req.session.userId,
          roomId: result.rows[0].roomId,
          restaurants: result.rows[0].restaurants
        };
      }
    })
    .then(result => {
      req.session.userId = result.userId;
      req.session.roomId = result.roomId;
      res.json(result);
    })
    .catch(err => next(err));
});

app.get('/api/restaurants', (req, res, next) => {
  const roomId = req.session.roomId;
  if (!req.session.roomId) {
    throw new ClientError('There is no associated roomId with this session', 400);
  }

  const getRestaurantListSql = `
    select "restaurants"
      from "rooms"
     where "roomId" = $1
  `;
  const value = [roomId];
  db.query(getRestaurantListSql, value)
    .then(result => {
      const restaurants = result.rows[0];
      if (!restaurants) {
        return res.status(400).json({
          error: `The room ${value[0]} you are looking for does not exist`
        });
      }
      res.status(200).json(restaurants);
    })
    .catch(err => console.error(err));
});

app.get('/api/restaurants/:restaurantId', (req, res, next) => {
  const { restaurantId } = req.params;
  const options = {
    method: 'GET',
    headers: {
      Authorization: process.env.YELP_KEY,
      'Content-Type': 'application/json'
    }
  };
  fetch(`https://api.yelp.com/v3/businesses/${restaurantId}`, options)
    .then(result => result.json())
    .then(data => {
      return res.status(200).json(data);
    })
    .catch(err => next(err));
});

app.get('/api/restaurants/:restaurantId/reviews', (req, res, next) => {
  const { restaurantId } = req.params;
  const options = {
    method: 'GET',
    headers: {
      Authorization: process.env.YELP_KEY,
      'Content-Type': 'application/json'
    }
  };
  fetch(`https://api.yelp.com/v3/businesses/${restaurantId}/reviews`, options)
    .then(result => result.json())
    .then(data => {
      return res.status(200).json(data);
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`can not ${req.method} ${req.originalUrl}`, 404));
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
