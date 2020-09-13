const router = require("express").Router();
const {
  deleteProduct,
  updateProduct,
  createProduct,
  getProducts,
  getProduct,
  getNewId
} = require("../database/products");

router.get("/", async (req, res) => {
  res.send(await getProducts());
});

router.get("/newid", async (req, res) => {
  res.send(await getNewId());
});

router.get("/:id", async (req, res) => {
  res.send(await getProduct(req.params.id));
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
  await updateProduct(apiRequest.params.id, updatedProduct);
  apiResponse.send({
    message: "Product updated.",
  });
});

module.exports = router;
