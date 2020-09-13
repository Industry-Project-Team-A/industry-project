const router = require("express").Router();
const {
  deleteStore,
  updateStore,
  createStore,
  getStores,
  getStore,
} = require("../database/stores");

router.get("/", async (req, res) => {
  res.send(await getStores());
});

router.get("/:tag", async (req, res) => {
  res.send(await getStore(req.params.tag));
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

router.delete("/:tag", async (apiRequest, apiResponse) => {
  await deleteStore(apiRequest.params.tag);
  apiResponse.send({
    message: "Store deleted.",
  });
});

router.put("/:tag", async (apiRequest, apiResponse) => {
  const updatedStore = apiRequest.body;
  console.log({
    updatedStore,
  });
  await updateStore(apiRequest.params.tag, updatedStore);
  apiResponse.send({
    message: "Store updated.",
  });
});

module.exports = router;
