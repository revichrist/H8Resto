const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;


const client = new MongoClient(uri);
let db;

async function mongoConnection() {
  try {
    await client.connect();
    console.log("Connected to the server!");
    db = client.db("h8-resto");
    return db;
  } catch (error) {
    await client.close();
  }
}

function getDB() {
  return db;
}

module.exports = {
  mongoConnection,
  getDB,
};