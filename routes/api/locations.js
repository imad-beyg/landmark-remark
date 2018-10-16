const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

//Models
const Location = require("../../models/Location");

//Location Validation
const validateLocationInput = require("../../validation/location");

// @route       GET api/locations
// @desc        Get All Locations
// @access      Public
router.get("/", (request, response) => {
  const errors = {};

  Location.find()
    .populate("user", ["name", "email", "avatar"])
    .then(locations => {
      if (!locations) {
        errors.locations = "There are no locations";
        return response.status(404).json(errors);
      }

      response.json(locations);
    })
    .catch(err =>
      response.status(404).json({ locations: "There are no locations" })
    );
});
// @route       POST api/locations
// @desc        Add/Update Location
// @access      Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    //Validate Data
    const { errors, isValid } = validateLocationInput(request.body);
    if (!isValid) {
      return response.status(400).json(errors);
    }

    //Check If User's Location Already Exists
    Location.findOne({
      user: request.user.id,
      latitude: request.body.latitude,
      longitude: request.body.longitude
    })
      .then(location => {
        if (location) {
          //Update Location Note
          newUserLocation = new Location({
            user: request.user.id,
            latitude: request.body.latitude,
            longitude: request.body.longitude,
            note: request.body.note
          });

          newUserLocation
            .save()
            .then(userLocation => response.json(userLocation))
            .catch(error => response.json(error));
        } else {
          //Add Location Note
          newUserLocation = new Location({
            user: request.user.id,
            latitude: request.body.latitude,
            longitude: request.body.longitude,
            note: request.body.note
          });

          newUserLocation
            .save()
            .then(userLocation => response.json(userLocation))
            .catch(error => response.json(error));
        }
      })
      .catch(error => response.json(error));
  }
);
module.exports = router;
