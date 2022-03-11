require("dotenv").config();
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
const port = process.env.PORT;
app.listen(port, console.log(`App is working on port ${port}`));
