const router = require("express").Router();
const {
  deleteCategory,
  updateCategory,
  createCategory,
  getCategories,
  getCategory,
  getNewId
} = require("../database/categories");

router.get("/newid", async (req,res) => {
  res.send(await getNewId());
})

router.get("/:id", async (req, res) => {
  res.send(await getCategory(req.params.id));
});

router.get("/", async (req, res) => {
  res.send(await getCategories());
});

router.post("/", async (apiRequest, apiResponse) => {
  const newCategory = apiRequest.body;
  await createCategory(newCategory);
  apiResponse.send({
    message: "New category created.",
    allCategories: await getCategories(),
    thanks: true,
  });
});

router.delete("/:id", async (apiRequest, apiResponse) => {
  await deleteCategory(apiRequest.params.id);
  apiResponse.send({
    message: "Category deleted.",
  });
});

router.put("/:id", async (apiRequest, apiResponse) => {
  const updatedCategory = apiRequest.body;
  console.log({
    updatedCategory,
  });
  await updateCategory(apiRequest.params.id, updatedCategory);
  apiResponse.send({
    message: "Category updated.",
  });
});

module.exports = router;
