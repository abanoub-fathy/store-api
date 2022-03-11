require("dotenv").config();
const connectToDB = require("./db/connect");
const express = require("express");
require("express-async-errors");

// connect to the DB
require("./db/connect");

// create express app
const app = express();

// config express app
app.use(express.json());

// routes
app.use("/api/v1/products", require("./routes/product"));

// express middlewares
app.use(require("./middlewares/not-found"));
app.use(require("./middlewares/error"));

// launch the server
const startApp = async () => {
  const port = process.env.PORT || 3000;
  try {
    // connect to the db
    await connectToDB(process.env.DB_URL);
    console.log("Connected to the DB..");
    // listen on the specified port
    app.listen(port, console.log(`App is working on port ${port}`));
  } catch (e) {
    console.log("Cannot start the App", e.message);
  }
};

startApp();
