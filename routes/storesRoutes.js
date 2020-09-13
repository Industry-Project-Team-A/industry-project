const router = require("express").Router();
const {
  deleteStore,
  updateStore,
  createStore,
  getStores,
  getStore,
  getNewId
} = require("../database/stores");

router.get("/", async (req, res) => {
  res.send(await getStores());
});

router.get("/newid", async (req, res) => {
  res.send(await getNewId());
});

router.get("/:id", async (req, res) => {
  res.send(await getStore(parseInt(req.params.id)))
});

router.post("/", async (apiRequest, apiResponse) => {
  const newStore = apiRequest.body;
  await createStore(newStore);
  apiResponse.send({
    message: "New store created.",
    allStores: await getStores(),
    thanks: true,
  });
});

router.delete("/:id", async (apiRequest, apiResponse) => {
  await deleteStore(parseInt(apiRequest.params.id));
  apiResponse.send({
    message: "Store deleted.",
  });
});

router.put("/:id", async (apiRequest, apiResponse) => {
  const updatedStore = apiRequest.body;
  await updateStore(parseInt(apiRequest.params.id), updatedStore);
  apiResponse.send({
    message: "Store updated.",
  });
});

module.exports = router;
