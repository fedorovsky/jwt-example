const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const parseBearerToken = require('parse-bearer-token').default;
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('morgan');
const dotenv = require('dotenv').load();
const User = require('./models/User.js');
const signToken = require('./utils.js').signToken;
const usersCtrl = require('./controllers/users.js');
const routes = require('./routes');

mongoose.set('useCreateIndex', true);
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log(err);
  });

// Instantiating the express app
const app = express();
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// INstantiating the express-jwt middleware
const jwtMiddleware = exjwt({
  secret: process.env.JWT_SECRET,
});

/**
 * USER ROUTES
 */
app.post('/login', usersCtrl.login);
app.post('/register', usersCtrl.register);

/**
 * PRIVATE ROUTE
 */
app.get('/private', jwtMiddleware, (req, res) => {
  const token = parseBearerToken(req);
  const user = jwt.verify(token, process.env.JWT_SECRET);
  res.status(200).json({
    message: 'Success Token',
    user: user,
  });
});

app.use('/api', routes);

/**
 * PUBLIC ROUTE
 */
app.get('/', (req, res) => {
  res.send('Public Route');
});

/**
 * ERROR HANDLER
 */
app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send(err);
  } else {
    next(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server was started on port: ${process.env.PORT}`);
});
