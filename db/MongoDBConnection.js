const { MongoClient } = require("mongodb");
const dbSecrets = require("../config/dbSecrets.json");

class MongoDBConnection {
  constructor() {
    const uri = `mongodb+srv://${dbSecrets.user}:${dbSecrets.password}@cluster0.16qkd.mongodb.net/?retryWrites=true&w=majority`;
    this.client = new MongoClient(uri);
    this.init();
  }

  async addHistory(userId, history) {
    let historyCollection = this.client
      .db("crack-blackjack")
      .collection("history");
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

  async init() {
    await this.client.connect();
  }

  async close() {
    await this.client.close();
  }
}
module.exports = new MongoDBConnection();
