const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

//Routes
const users = require("./routes/api/users");
const locations = require("./routes/api/locations");

//Init App
const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

//Connect Database
const database = require("./config/database");

//Use Routes
app.use("/api/users", users);
app.use("/api/locations", locations);

//Define Server Port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on ${port}`));
