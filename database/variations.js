const { getDatabase } = require("./mongo-common");

const collectionName = "variations";

async function createVariation(variation) {
  const database = await getDatabase();
  const { insertedId } = await database
    .collection(collectionName)
    .insertOne(variation);
  return insertedId;
}

async function getVariations() {
  const database = await getDatabase();
  return await database
    .collection(collectionName)
    .find({})
    .collation({ locale: "en_US", numericOrdering: true })
    .toArray();
}

async function getVariation(id) {
  const database = await getDatabase();
  return await database.collection(collectionName).findOne({
    id: id,
  });
}

async function deleteVariation(id) {
  const database = await getDatabase();
  await database.collection(collectionName).deleteOne({
    id: id,
  });
}

async function updateVariation(id, variation) {
  const database = await getDatabase();

  delete variation._id;

  await database.collection(collectionName).update(
    {
      id: id,
    },
    {
      $set: {
        ...variation,
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
  createVariation,
  getVariations,
  deleteVariation,
  updateVariation,
  getVariation,
  getNewId,
};
