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
           "roomId",
           "isActive"
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
                restaurants: result.rows[0].restaurants,
                isActive: result.rows[0].isActive
              };
            })
        );
      } else {
        return {
          userId: req.session.userId,
          roomId: result.rows[0].roomId,
          restaurants: result.rows[0].restaurants,
          isActive: result.rows[0].isActive
        };
      }
    })
    .then(result => {
      if (result.isActive === true) {
        req.session.userId = result.userId;
        req.session.roomId = result.roomId;
        res.status(200).json(result);
      } else {
        return res.status(200).json({ isActive: result.isActive });
      }
    })
    .catch(err => next(err));
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

app.post('/api/rooms', (req, res, next) => {
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

  fetch(`https://api.yelp.com/v3/businesses/search?categories=${req.body.category}&location=${req.body.location}&radius=${req.body.radius}&price=${req.body.price}&limit=10`, options)
    .then(response => response.json())
    .then(data => {
      const bytes = crypto.randomBytes(4).toString('hex');

      const params = [data, bytes, true, req.session.userId];
      const makeRoomSql = `
      insert into "rooms" ("roomId", "restaurants", "entryKey", "isActive", "userId")
      values (default, $1, $2, $3, $4)
      returning "roomId", "entryKey", "isActive", "userId"
      ;`;
      db.query(makeRoomSql, params)
        .then(result1 => {
          req.session.roomId = result1.rows[0].roomId;
          res.status(200).json(result1.rows[0]);
        });
    })
    .catch(err => next(err));
});

app.get('/api/liked-restaurants/:restaurantId', (req, res, next) => {
  const likedRestaurantSql = `
  select *
  from "likedRestaurants"
 where "roomId" = $1
   and "restaurantId" = $2
   and "userId" = $3
  `;
  const params = [req.session.roomId, req.params.restaurantId, req.session.userId];
  db.query(likedRestaurantSql, params)
    .then(result => {
      if (!result.rows[0]) {
        res.status(200).json({ liked: null });
      } else {
        res.status(200).json({ liked: result.rows[0] });
      }
    })
    .catch(err => next(err));
});

app.post('/api/liked-restaurants', (req, res, next) => {
  const likedRestaurantSql = `
  insert into "likedRestaurants" ("roomId", "restaurantId", "userId")
  values ($1, $2, $3)
  `;
  const params = [req.session.roomId, req.body.restaurantId, req.session.userId];
  db.query(likedRestaurantSql, params)
    .then(result => res.sendStatus(201))
    .catch(err => next(err));
});

app.delete('/api/liked-restaurants/:restaurantId', (req, res, next) => {
  const deleteSql = `
  delete from "likedRestaurants"
  where "roomId" = $1
    and "restaurantId" = $2
    and "userId" = $3
  `;
  const params = [req.session.roomId, req.params.restaurantId, req.session.userId];
  db.query(deleteSql, params)
    .then(result => res.sendStatus(204))
    .catch(err => next(err));
});

app.get('/api/likedRestaurants', (req, res, next) => {
  const determineMatchSql = `
  select count("roomId"), "restaurantId"
  from "likedRestaurants"
  where "roomId"=$1
  group by "restaurantId"
  having count("roomId") > 1
  `;
  const params = [req.session.roomId];
  db.query(determineMatchSql, params)
    .then(result => {
      if (!result.rows.length) {
        return res.status(200).json({ match: null });
      }
      res.status(200).json({ match: result.rows[0].restaurantId });
    })
    .catch(err => next(err));
});

app.get('/api/isActive', (req, res, next) => {
  const params = [req.session.roomId];
  const isActiveSql = `
  select "isActive"
  from "rooms"
  where "roomId" = $1
  `;
  db.query(isActiveSql, params)
    .then(result => res.status(200).json({ isActive: result.rows[0].isActive }))
    .catch(err => next(err));
});

app.put('/api/leave', (req, res, next) => {
  const params1 = [req.session.roomId];
  const checkHostSql = `
  select "userId"
  from "rooms"
  where "roomId" = $1;
  `;
  db.query(checkHostSql, params1)
    .then(result => {
      if (result.rows[0].userId === req.session.userId) {
        const params2 = [req.session.roomId];
        const closeRoomSql = `
        update "rooms"
        set "isActive"=false
        where "roomId"=$1;
        `;
        db.query(closeRoomSql, params2);
      }
    })
    .then(result2 => {
      const message = req.session.roomId;
      req.session.roomId = '';
      res.status(200).json(`You have left Room: ${message}`);
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
