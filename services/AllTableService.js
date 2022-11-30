const TableService = require("./TableService");
const ActionService = require("./ActionService");

class AllTableService {
  constructor() {
    this.tables = {};
  }

  addTable(id, numPlayers) {
    let tableService = new TableService(numPlayers);
    let actionService = new ActionService(tableService);
    this.tables[id] = { tableService, actionService };
  }
}

module.exports = AllTableService;
