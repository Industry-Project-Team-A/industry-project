const router = require("express").Router();
const {
  deleteVariation,
  updateVariation,
  createVariation,
  getVariations,
  getVariation,
  getNewId,
} = require("../database/variations");

router.get("/", async (req, res) => {
  res.send(await getVariations());
});

router.get("/newid", async (req, res) => {
  res.send(await getNewId());
});

router.get("/:id", async (req, res) => {
  res.send(await getVariation(req.params.id));
});

router.post("/", async (apiRequest, apiResponse) => {
  const newVariation = apiRequest.body;
  await createVariation(newVariation);
  apiResponse.send({
    message: "New variation created.",
    allVariations: await getVariations(),
    thanks: true,
  });
});

router.delete("/:id", async (apiRequest, apiResponse) => {
  await deleteVariation(apiRequest.params.id);
  apiResponse.send({
    message: "Variation deleted.",
  });
});

router.put("/:id", async (apiRequest, apiResponse) => {
  const updatedVariation = apiRequest.body;
  await updateVariation(apiRequest.params.id, updatedVariation);
  apiResponse.send({
    message: "Variation updated.",
  });
});

module.exports = router;
