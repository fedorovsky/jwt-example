const User = require("../models/User.js");
const signToken = require("../utils.js").signToken;

module.exports = {
  /**
   * LOGIN METHOD
   */
  login: (req, res) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user.validPassword(req.body.password)) {
          res.status(200).json({
            message: "Authentication Success",
            token: signToken(user)
          });
        } else {
          res.status(401).json({
            message: "Password Error",
            token: null
          });
        }
      })
      .catch(err => {
        res.status(401).json({
          message: "Authentication Error",
          token: null
        });
      });
  },
  /**
   * REGISTER METHOD
   */
  register: (req, res) => {
    const user = new User({
      email: req.body.email,
      password: req.body.password
    });
    user
      .save()
      .then(user =>
        res.status(200).json({
          message: "User created",
          user: user,
          token: signToken(user)
        })
      )
      .catch(err => {
        res.status(500).json({
          message: "Error User created",
          error: err,
          token: null
        });
      });
  }
};
