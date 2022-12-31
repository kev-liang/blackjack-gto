const { OAuth2Client } = require("google-auth-library");
const MongoDBConnection = require("../db/MongoDBConnection");
const StatisticsService = require("../services/StatisticsService");
const jwt = require("jsonwebtoken");

const verify = async (client, credential, client_id) => {
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
};

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (req.query.isLoggedIn === "false") {
    next();
    return;
  }
  if (!token) {
    res.status(500).send("No token provided");
    return;
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(500).send("Failed to authenticate");
      return;
    }
    req.userId = decoded.userId;
    next();
  });
};

const userController = (app, allTableService) => {
  app.post("/authenticate", async (req, res) => {
    let { idToken } = req.body;
    let { id } = req.query;
    let { credential, client_id } = idToken;
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
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: 300
    });

    res.status(200).json({ user: authUser, token });
  });

  app.get("/getStatistics", verifyJWT, async (req, res) => {
    if (!req.userId) {
      res.status(403).send("Unauthenticated for /getStatistics request");
      return;
    }
    let { userId } = req.query;
    console.log(`Getting history for ${{ userId }}`);
    let history = await MongoDBConnection.getHistory(userId);
    if (!history) {
      res.status(200).send({ mostMisplayedValues: {}, percentageCorrect: 0 });
      return;
    }
    let statistics = StatisticsService.getAllStatistics(history);
    res.status(200).send(statistics);
  });
};
module.exports = { userController, verifyJWT };
