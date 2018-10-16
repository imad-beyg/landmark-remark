const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../../models/User");

// Register Validation
const validateRegisterInput = require("../../validation/register");

// @route       POST api/users/register
// @desc        Regsiter a user
// @access      Public

router.post("/register", (request, response) => {
  //Validate Data
  const { errors, isValid } = validateRegisterInput(request.body);
  if (!isValid) {
    return response.status(400).json(errors);
  }

  //Check If User Exits
  User.findOne({ email: request.body.email })
    .then(user => {
      if (user) {
        //If User Exits

        //Create JWT Payload
        const payLoad = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };

        //Sign token
        jwt.sign(payLoad, "secret", { expiresIn: 3600 }, (error, token) => {
          response.json({ registration: false, token: "Bearer " + token });
        });
      } else {
        //Get User Email Avatar
        const avatar = gravatar.url(
          request.body.email,
          {
            s: "200",
            r: "pg",
            d: "retro"
          },
          false
        );

        //User Data
        const newUser = new User({
          name: request.body.name,
          email: request.body.email,
          avatar: avatar
        });

        //Add User To DB
        newUser
          .save()
          .then(user => {
            //Create JWT Payload
            const payLoad = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            };

            //Sign token
            jwt.sign(payLoad, "secret", { expiresIn: 3600 }, (error, token) => {
              response.json({ registration: true, token: "Bearer " + token });
            });
          })
          .catch(error => response.json(error));
      }
    })
    .catch(error => response.json(error));
});

module.exports = router;
