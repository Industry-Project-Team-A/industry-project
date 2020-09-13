const router = require("express").Router();
const {
  deleteCustomProduct,
  updateCustomProduct,
  createCustomProduct,
  getCustomProducts,
} = require("../database/customProducts");

router.get("/", async (req, res) => {
  res.send(await getCustomProducts());
});

router.post("/", async (apiRequest, apiResponse) => {
  const newCustomProduct = apiRequest.body;
  await createCustomProduct(newCustomProduct);
  apiResponse.send({
    message: "New customProduct created.",
    allCustomProducts: await getCustomProducts(),
    thanks: true,
  });
});

router.delete("/:id", async (apiRequest, apiResponse) => {
  await deleteCustomProduct(apiRequest.params.id);
  apiResponse.send({
    message: "CustomProduct deleted.",
  });
});

router.put("/:id", async (apiRequest, apiResponse) => {
  const updatedCustomProduct = apiRequest.body;
  console.log({
    updatedCustomProduct,
  });
  await updateCustomProduct(apiRequest.params.id, updatedCustomProduct);
  apiResponse.send({
    message: "CustomProduct updated.",
  });
});

module.exports = router;
