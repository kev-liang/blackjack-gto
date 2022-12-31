const { MongoClient } = require("mongodb");
const User = require("../models/dbo/User");

class MongoDBConnection {
  constructor() {
    this.dbName = "";
    const uri = this.getUri();
    this.client = new MongoClient(uri);
    this.init();
  }

  getUri() {
    let user = process.env.DB_USER;
    let password = process.env.DB_PASSWORD;
    return `mongodb+srv://${user}:${password}@cluster0.16qkd.mongodb.net/?retryWrites=true&w=majority`;
  }

  async addHistory(userId, history) {
    console.log(`Saving history: ${history}. User: ${userId}`);
    let historyCollection = this.client.db(this.dbName).collection("users");
    const player = await historyCollection.findOne({ userId });
    history.updatedTimestamp = new Date().toISOString();
    if (player) {
      player.history.push(history);
      historyCollection.updateOne({ userId }, { $set: player });
    } else {
      let newPlayer = { userId, history: [history] };
      historyCollection.insertOne(newPlayer);
    }
  }

  createUser(userId) {
    console.log(`Creating user: ${userId}`);
    let userCollection = this.client.db(this.dbName).collection("users");
    let user = new User(userId);
    userCollection.insertOne({ ...user });
  }

  async getUser(userId) {
    let userCollection = this.client.db(this.dbName).collection("users");
    const user = await userCollection.findOne({ userId });
    return user;
  }

  async getHistory(userId) {
    let user = await this.getUser(userId);
    return user ? user.history : null;
  }

  async init() {
    await this.client.connect();
  }

  async close() {
    await this.client.close();
  }
}
module.exports = new MongoDBConnection();
