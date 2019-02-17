const MongoClient = require("mongodb").MongoClient;
const settings = require("./settings.json");
const serverUrl = "mongodb://localhost:27017/";
const database1 = "duckHacks";
const mongoConfig = settings.mongoConfig;

let _connection = undefined;
let _db = undefined;

 let db = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(serverUrl,{ useNewUrlParser: true });
    _db = await _connection.db(database1);
  }
  return _db;
};

module.exports = {
  db : db()
}