const { OAuth2Client } = require("google-auth-library");
const MongoDBConnection = require("../db/MongoDBConnection");

module.exports = (app) => {
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
    return payload["sub"];
  }

  app.post("/authenticate", async (req, res) => {
    let { token } = req.body;
    let { credential, client_id } = token;
    const client = new OAuth2Client(client_id);
    const userId = await verify(client, credential, client_id).catch(
      console.error
    );
    console.log("Finding user with id:", userId);
    let user = await MongoDBConnection.getUser(userId);
    if (!user) {
      console.log("Creating user:", userId);
      MongoDBConnection.createUser(userId);
    }
    res.status(200).send("User authenticated");
  });
};
