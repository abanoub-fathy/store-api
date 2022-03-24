const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  // destructure the props that user can filter with them
  const { featured, name, company, numericFilters } = req.query;
  const queryObject = {};

  // filter by featured
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  // filter by name
  if (name) {
    // apply regex for search by name
    queryObject.name = { $regex: name, $options: "i" };
  }

  // filter by company
  if (company) {
    queryObject.company = { $regex: company, $options: "i" };
  }

  // numericFilters
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      "<": "$lt",
      "=": "$eq",
      ">=": "$gte",
      "<=": "$lte",
    };
    let regEx = /\b(>|<|>=|<=|=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    filters.split(",").forEach((part) => {
      const [prop, operator, value] = part.split("-");
      queryObject[prop] = { ...queryObject[prop], [operator]: Number(value) };
    });
  }

  // destructure the sorting props
  let { sort } = req.query;
  if (sort) {
    sort = sort.split(",").join(" ");
  } else {
    sort = "-createdAt";
  }

  // destructure the selection fields
  let { fields } = req.query;
  if (fields) {
    fields = fields.split(",").join(" ");
  }

  // pagination
  let { page } = req.query;
  if (+page < 1) page = 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;

  // execute the query to find the products
  const total = await Product.find(queryObject).count();
  const products = await Product.find(queryObject)
    .sort(sort)
    .select(fields)
    .limit(limit)
    .skip(skip);

  // return the response
  res.send({
    totalPages: Math.ceil(total / limit),
    nbHits: products.length,
    products,
  });
};

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ page: "2" });
  res.send(products);
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
