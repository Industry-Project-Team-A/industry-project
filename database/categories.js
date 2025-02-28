const { getDatabase } = require("./mongo-common");
const { ObjectID } = require("mongodb");
const collectionName = "categories";

async function createCategory(category) {
  const database = await getDatabase();
  const { insertedId } = await database
    .collection(collectionName)
    .insertOne(category);
  return insertedId;
}

async function getCategory(id) {
  const database = await getDatabase();
  return await database.collection(collectionName).findOne({
    id: id,
  });
}

async function getCategories() {
  const database = await getDatabase();
  return await database
    .collection(collectionName)
    .find({})
    .collation({ locale: "en_US", numericOrdering: true })
    .toArray();
}

async function deleteCategory(id) {
  const database = await getDatabase();
  await database.collection(collectionName).deleteOne({
    id: id,
  });
}

async function updateCategory(id, category) {
  const database = await getDatabase();
  delete category._id;
  await database.collection(collectionName).update(
    {
      id: id,
    },
    {
      $set: {
        ...category,
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
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
  getCategory,
  getNewId,
};
