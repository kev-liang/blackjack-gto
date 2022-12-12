const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoDBConnection = require("./db/MongoDBConnection");

const cardController = require("./controller/CardController");
const settingsController = require("./controller/SettingsController");
const basicStrategyController = require("./controller/BasicStrategyController");
const authController = require("./controller/AuthController");

const AllTableService = require("./services/AllTableService");
const BasicStrategyService = require("./services/BasicStrategyService");
const basicStrategyService = new BasicStrategyService(MongoDBConnection);

const path = require("path");

console.log("Starting with env: ", process.env);

let port = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static("./build"));

const allTableService = new AllTableService(basicStrategyService);

authController(app);
cardController(app, allTableService);
settingsController(app, allTableService);
basicStrategyController(app, basicStrategyService);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
