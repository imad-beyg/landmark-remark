const mongoose = require("mongoose");

let connectionString =
  "mongodb://landmark:Delta2018@ds129823.mlab.com:29823/landmark-remark";

//Connect to MongoDB
mongoose
  .connect(connectionString)
  .then(() => console.log("Database connection successful"))
  .catch(err => console.log(err));
