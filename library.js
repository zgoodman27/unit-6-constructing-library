// Your code goes here
//import MongoClient and ObjectId from Mongodb
const { MongoClient, ObjectId } = require("mongodb");

//import the book schema
const bookSchema = require("./models/book.schema");

//creating class library
class Library {
  static connected = false;
  constructor(dbUrl, dbName, collName) {
    if (!Library.connected) {
      console.log("Connected to the Database");
      Library.connected = true;
    }
    this.dbUrl = dbUrl;
    this.dbName = dbName;
    this.collName = collName;
    this.dbClient;
  }
  //creating the async client method
  async client() {
    console.log(`Connecting to ${this.dbUrl}...`);
    this.dbClient = await MongoClient.connect(this.dbUrl);
    console.log("Connected to database.");
    return this.dbClient;
  }
  //creating the async client method
  async test() {
    const client = await this.client();
    client.close();
  }

  //create the Async collection Method
  async collection() {
    const client = await this.client();
    const db = client.db(this.dbName);
    const collection = db.collection(this.collName);
    return collection;
  }

  //create the async allBooks method
  async allBooks() {
    const collection = await this.collection();
    return collection.find({});
  }

  //create the async findOneBook method
  async findOneBook(id) {
    const docId = new ObjectId(id);
    const collection = await this.collection();
    return collection.find({ _id: docId });
  }

  //create the async findBooks method
  async findBooks(query) {
    const collection = await this.collection();
    return collection.find(query);
  }

  //create the async changeBook method
  async changeBook(id, newInfo) {
    if (!ObjectId.isValid(id)) throw new Error("Invalid ID");
    if (!newInfo || Object.keys(newInfo).length === 0)
      throw new Error("No updated info provided");
    const allowedKeys = ["title", "author", "copies"];
    for (const key of Object.keys(newInfo)) {
      if (!allowedKeys.includes(key)) throw new Error(`Invalid field: ${key}`);
    }
    const mongoId = new ObjectId(id);
    const infoObj = { $set: newInfo };
    const collection = await this.collection();
    await collection.updateOne({ _id: mongoId }, infoObj);
    console.log("Book Updated");
  }

  //create async removeBook method
  async removeBook(id) {
    const mongoId = new ObjectId(id);
    const collection = await this.collection();
    await collection.deleteOne({ _id: mongoId });
    console.log("Book Removed!");
  }
  //create async add book to collection method
  async addBook(info) {
    const collection = await this.collection();
    await collection.insertOne(info);
    console.log(
      `${info.title} by ${info.author} has been Added to the collection`
    );
  }
}

module.exports = Library;
