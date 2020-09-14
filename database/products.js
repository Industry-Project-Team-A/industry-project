const { getDatabase } = require("./mongo-common");
const { ObjectID } = require("mongodb");

const collectionName = "products";

async function createProduct(user) {
  const database = await getDatabase();
  const { insertedId } = await database
    .collection(collectionName)
    .insertOne(user);
  return insertedId;
}

async function getProducts() {
  const database = await getDatabase();
  return await database
    .collection(collectionName)
    .find({})
    .collation({ locale: "en_US", numericOrdering: true })
    .toArray();
}

async function getProduct(id) {
  const database = await getDatabase();
  return await database.collection(collectionName).findOne({
    id: id,
  });
}

async function deleteProduct(id) {
  const database = await getDatabase();
  await database.collection(collectionName).deleteOne({
    id: id,
  });
}

async function updateProduct(id, product) {
  const database = await getDatabase();
  delete product._id;

  await database.collection(collectionName).updateOne(
    { id: id },
    {
      $set: {
        ...product,
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
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  getNewId,
};
