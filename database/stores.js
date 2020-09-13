const { getDatabase } = require("./mongo-common");
const { ObjectID } = require("mongodb");

const collectionName = "stores";

async function createStore(store) {
  const database = await getDatabase();
  const { insertedId } = await database
    .collection(collectionName)
    .insertOne(store);
  return insertedId;
}

async function getStores() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

async function getStore(id) {
  const database = await getDatabase();
  return await database.collection(collectionName).findOne({
    id: parseInt(id),
  });
}

async function deleteStore(id) {
  const database = await getDatabase();
  await database.collection(collectionName).deleteOne({
    id: parseInt(id),
  });
}

async function updateStore(id, store) {
  const database = await getDatabase();
  delete store._id;

  await database.collection(collectionName).update(
    {
      id: parseInt(id)
    },
    {
      $set: {
        ...store,
      },
    }
  );
}

async function getNewId() {
  const database = await getDatabase();
  const id = await database
    .collection(collectionName)
    .find({})
    .sort({ id: -1 })
    .limit(1)
    .toArray();

  return (newId = [id[0].id + 1]);
}

module.exports = {
  createStore,
  getStores,
  deleteStore,
  updateStore,
  getStore,
  getNewId
};
