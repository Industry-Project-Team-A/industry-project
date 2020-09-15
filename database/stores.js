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
  return await database
    .collection(collectionName)
    .find({})
    .collation({ locale: "en_US", numericOrdering: true })
    .toArray();
}

async function getStore(id) {
  const database = await getDatabase();
  return await database.collection(collectionName).findOne({
    id: id,
  });
}

async function deleteStore(id) {
  const database = await getDatabase();
  await database.collection(collectionName).deleteOne({
    id: id,
  });
}

async function updateStore(id, store) {
  const database = await getDatabase();
  delete store._id;

  await database.collection(collectionName).update(
    {
      id: id,
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
  const maxId = await database
    .collection(collectionName)
    .find({})
    .sort({ id: -1 })
    .limit(1)
    .collation({ locale: "en_US", numericOrdering: true })
    .toArray();

  const id = (parseInt(maxId[0].id) + 1).toString();

  return (newId = [id]);
}

module.exports = {
  createStore,
  getStores,
  deleteStore,
  updateStore,
  getStore,
  getNewId,
};
