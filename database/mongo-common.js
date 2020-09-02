const {
    MongoClient
} = require('mongodb');

let database = null;

async function startDatabase() {
    const mongoDBURL = 'mongodb+srv://sa:Cjc3425%40@cluster0.r3xye.gcp.mongodb.net/industry-project';
    const connection = await MongoClient.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
 });
    database = connection.db();
}

async function getDatabase() {
    if (!database) await startDatabase();
    return database;
}

module.exports = {
    getDatabase,
    startDatabase,
};