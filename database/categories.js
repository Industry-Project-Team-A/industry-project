const { getDatabase } = require("./mongo-common");
// https://docs.mongodb.com/manual/reference/method/ObjectId/
const { ObjectID } = require("mongodb");

// a "collection" in mongo is a lot like a list which is a lot like an Array
const collectionName = "categories";

async function createCategory(user) {
  const database = await getDatabase();
  // for `insertOne` info, see https://docs.mongodb.com/manual/reference/method/js-collection/
  const { insertedId } = await database
    .collection(collectionName)
    .insertOne(user);
  return insertedId;
}

async function getCategory(catID) {
  const database = await getDatabase();
  return await database.collection(collectionName).findOne({
    id: parseInt(catID),
  });
}

async function getCategories() {
  const database = await getDatabase();
  // `find` https://docs.mongodb.com/manual/reference/method/db.collection.find/#db.collection.find
  return await database.collection(collectionName).find({}).toArray();
}

async function deleteCategory(id) {
  const database = await getDatabase();
  // https://docs.mongodb.com/manual/reference/method/ObjectId/
  // for `deleteOne` info see  https://docs.mongodb.com/manual/reference/method/js-collection/
  await database.collection(collectionName).deleteOne({
    _id: new ObjectID(id),
  });
}

async function updateCategory(id, user) {
  const database = await getDatabase();

  // `delete` is new to you. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
  delete user._id;

  // https://docs.mongodb.com/manual/reference/method/db.collection.update/
  await database.collection(collectionName).update(
    {
      _id: new ObjectID(id),
    },
    {
      $set: {
        ...user,
      },
    }
  );
}

// export the functions that can be used by the main app code
module.exports = {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
  getCategory,
};
