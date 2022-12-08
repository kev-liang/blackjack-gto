const { MongoClient } = require("mongodb");

class MongoDBConnection {
  constructor() {
    const uri = this.getUri();
    this.client = new MongoClient(uri);
    this.init();
  }

  getUri() {
    let user, password;
    if (process.env.NODE_ENV === "production") {
      user = process.env.DB_USER;
      password = process.env.DB_PASSWORD;
    } else {
      const dbSecrets = require("../config/dbSecrets.json");
      user = dbSecrets.user;
      password = dbSecrets.password;
    }
    return `mongodb+srv://${user}:${password}@cluster0.16qkd.mongodb.net/?retryWrites=true&w=majority`;
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
