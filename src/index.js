const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");
const parseBearerToken = require("parse-bearer-token");
const uuid = require("uuid/v4");
const cors = require("cors");

const SECRET_KEY = "my secret key string";

// Instantiating the express app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// INstantiating the express-jwt middleware
const jwtMiddleware = exjwt({
  secret: SECRET_KEY
});

// MOCKING DB just for test
let USER_LIST_MOCK = [
  {
    id: uuid(),
    username: "username-1",
    password: "password-1"
  },
  {
    id: uuid(),
    username: "username-2",
    password: "password-2"
  }
];

// LOGIN ROUTE
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  for (let user of USER_LIST_MOCK) {
    if (username == user.username && password == user.password) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username
        },
        SECRET_KEY
      );
      res.status(200).json({
        message: "Authentication Success",
        token: token
      });
      break;
    } else {
      res.status(401).json({
        message: "Username or password is incorrect",
        token: null
      });
    }
  }
});

/**
 * PUBLIC ROUTE
 */
app.get("/", (req, res) => {
  res.send("Public Route");
});

/**
 * PRIVATE ROUTE
 */
app.get("/private", jwtMiddleware, (req, res) => {
  const token = parseBearerToken(req);
  const user = null;
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      res.send(err);
    }
    res.json({
      message: "Get Private Route",
      user: decoded
    });
  });
});

app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send(err);
  } else {
    next(err);
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server was started on port: ${PORT}`);
});
