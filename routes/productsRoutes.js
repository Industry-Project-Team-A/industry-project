const router = require("express").Router();
const {
  deleteProduct,
  updateProduct,
  createProduct,
  getProducts,
  getProduct,
} = require("../database/products");

router.get("/", async (req, res) => {
  res.send(await getProducts());
});

router.get("/:sku", async (req, res) => {
  res.send(await getProduct(req.params.sku));
});

router.post("/", async (apiRequest, apiResponse) => {
  const newProduct = apiRequest.body;
  await createProduct(newProduct);
  apiResponse.send({
    message: "New product created.",
    allProducts: await getProducts(),
    thanks: true,
  });
});

router.delete("/:id", async (apiRequest, apiResponse) => {
  await deleteProduct(apiRequest.params.id);
  apiResponse.send({
    message: "Product deleted.",
  });
});

router.put("/:id", async (apiRequest, apiResponse) => {
  const updatedProduct = apiRequest.body;
  console.log({
    updatedProduct,
  });
  await updateProduct(apiRequest.params.id, updatedProduct);
  apiResponse.send({
    message: "Product updated.",
  });
});

module.exports = router;
