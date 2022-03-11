const { connect } = require("mongoose");

connect(process.env.DB_URL)
  .then(() => console.log("Connected Successfullt to the DB.."))
  .catch((e) => console.log("Cannot connect to the DB"));
