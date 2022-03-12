require("dotenv").config();
const connectToDB = require("./db/connect");
const Product = require("./models/product");
const products = require("./products.json");

// launch the server
const startApp = async () => {
  try {
    // connect to the db
    await connectToDB(process.env.DB_URL);

    // delete the old products
    await Product.deleteMany();

    // create the new products
    await Product.create(products);

    console.log("Populated successfully!!!");
    process.exit(0);
  } catch (e) {
    console.log("Cannot start the App", e.message);
    process.exit(1);
  }
};

startApp();
