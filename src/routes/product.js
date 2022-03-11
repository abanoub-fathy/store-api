const { Router } = require("express");
const router = Router();
const productController = require("../controllers/product");

// get all products
router.get("/", productController.getAllProducts);
router.get("/static", productController.getAllProductsStatic);

module.exports = router;
