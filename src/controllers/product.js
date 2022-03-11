const getAllProducts = async (req, res) => {
  throw new Error("You are not allowed to use this route");
  res.send({ msg: "All products" });
};

const getAllProductsStatic = async (req, res) => {
  res.send({ msg: "Testing All product" });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
