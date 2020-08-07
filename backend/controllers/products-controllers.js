const Product = require("../models/product");

const getProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find();
  } catch (error) {
    const err = new Error("[GET][PRODUCTS] Fetching products failed");
    console.log(err.message);
    return next(err);
  }

  res.json({
    products: products.map((prod) => prod.toObject({ getters: true })),
  });
};

const addProduct = async (req, res, next) => {
  const { name, price, image } = req.body;

  const newProduct = new Product({
    name,
    price,
    image,
  });

  try {
    await newProduct.save();
  } catch (error) {
    const err = new Error("[POST][PRODUCTS] Add product failed");
    console.log(err.message);
    return next(err);
  }

  console.log("ADD PRODUCT");
  res.json({ newProduct });
};

const deleteProduct = async (req, res, next) => {
  const pid = req.params.pid;

  let product;
  try {
    product = await Product.findById(pid);
  } catch (error) {
    const err = new Error("[DELETE][PRODUCTS] Delete product failed (Could not find corresponding ID)");
    console.log(err.message);
    return next(err);
  }

  if (!product) {
    return next(new Error("[DELETE][PRODUCTS] Delete product failed (Could not find corresponding ID)"));
  }

  try {
    await product.remove();
  } catch (error) {
    const err = new Error("[DELETE][PRODUCTS] Delete product failed (Could not delete from db)");
    console.log(err.message);
    return next(err);
  }

  console.log("DELETE PRODUCT");
  res.json({message: "Product deleted"});
}


exports.getProducts = getProducts;
exports.addProduct = addProduct;
exports.deleteProduct = deleteProduct;