const { getDatabase } = require("./mongo-common");
// https://docs.mongodb.com/manual/reference/method/ObjectId/
const { ObjectID } = require("mongodb");

// a "collection" in mongo is a lot like a list which is a lot like an Array
const collectionName = "products";

async function createProduct(user) {
  const database = await getDatabase();
  // for `insertOne` info, see https://docs.mongodb.com/manual/reference/method/js-collection/
  const { insertedId } = await database
    .collection(collectionName)
    .insertOne(user);
  return insertedId;
}

async function getProducts() {
  const database = await getDatabase();
  // `find` https://docs.mongodb.com/manual/reference/method/db.collection.find/#db.collection.find
  return await database.collection(collectionName).find({}).toArray();
}

async function getProduct(sku) {
  const database = await getDatabase();
  return await database.collection(collectionName).findOne({
    sku: sku,
  });
}

async function deleteProduct(id) {
  const database = await getDatabase();
  // https://docs.mongodb.com/manual/reference/method/ObjectId/
  // for `deleteOne` info see  https://docs.mongodb.com/manual/reference/method/js-collection/
  await database.collection(collectionName).deleteOne({
    _id: new ObjectID(id),
  });
}

async function updateProduct(sku, product) {
  const database = await getDatabase();
    delete product._id;

  // https://docs.mongodb.com/manual/reference/method/db.collection.update/
  await database.collection(collectionName).updateOne(
    { sku: sku },
    {
      $set: {
        ...product,
      },
    }
  );
}

// export the functions that can be used by the main app code
module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  getProduct,
};
