const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cardController = require("./controller/CardController");
const settingsController = require("./controller/SettingsController");

const TableService = require("./services/TableService");
const ActionService = require("./services/ActionService");

const path = require("path");

console.log("Starting with env: ", process.env);

let port = process.env.NODE_ENV !== "production" ? 5000 : process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static("./build"));

const tableService = new TableService();
const actionService = new ActionService(tableService);

cardController(app, tableService, actionService);
settingsController(app, tableService);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
