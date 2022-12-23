const { OAuth2Client } = require("google-auth-library");
const MongoDBConnection = require("../db/MongoDBConnection");
const StatisticsService = require("../services/StatisticsService");

module.exports = (app, allTableService) => {
  async function verify(client, credential, client_id) {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: client_id
    });
    const payload = ticket.getPayload();
    const authClientId = payload.aud;
    if (authClientId !== client_id) {
      throw "Invalid client ID received in Google authentication";
    }
    return payload;
  }

  app.post("/authenticate", async (req, res) => {
    let { token } = req.body;
    let { id } = req.query;
    let { credential, client_id } = token;
    const client = new OAuth2Client(client_id);
    const authUser = await verify(client, credential, client_id).catch(
      console.error
    );
    const userId = authUser["sub"];
    console.log("Finding user with id:", userId);
    let user = await MongoDBConnection.getUser(userId);
    if (!user) {
      console.log("Creating user:", userId);
      MongoDBConnection.createUser(userId);
    }
    let { tableService } = allTableService.tables[id];
    tableService.setPlayerUserId(userId);
    res.send(authUser);
  });

  app.get("/getStatistics", async (req, res) => {
    let { userId } = req.query;
    let history = await MongoDBConnection.getHistory(userId);
    if (!history) {
      res.send({ mostMisplayedValues: {}, percentageCorrect: 0 });
      return;
    }
    let statistics = StatisticsService.getAllStatistics(history);
    res.send(statistics);
  });
};
