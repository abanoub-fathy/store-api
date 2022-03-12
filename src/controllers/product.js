const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  // destructur the props that user can search with them
  const { featured, name, company } = req.query;
  const queryObject = {};

  // filter by featured
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  // filter by name
  if (name) {
    queryObject.name = name;
  }

  // filter by company
  if (company) {
    queryObject.company = company;
  }

  // find the products
  const nbHits = await Product.find(queryObject).count();
  const products = await Product.find(queryObject);

  // return the response
  res.send({ nbHits, products });
};

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ page: "2" });
  res.send(products);
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
