const TableService = require("./TableService");
const ActionService = require("./ActionService");
const MongoDBConnection = require("../db/MongoDBConnection");

class AllTableService {
  constructor(basicStrategyService) {
    this.tables = {};
    this.basicStrategyService = basicStrategyService;
  }

  addTable(id, numPlayers) {
    console.log(`Adding ${numPlayers} to table id: ${id}`);
    let tableService = new TableService(numPlayers);
    let actionService = new ActionService(
      tableService,
      this.basicStrategyService,
      MongoDBConnection
    );
    this.tables[id] = { tableService, actionService };
  }
}

module.exports = AllTableService;
