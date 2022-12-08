const TableService = require("./TableService");
const ActionService = require("./ActionService");

class AllTableService {
  constructor(basicStrategyService) {
    this.tables = {};
    this.basicStrategyService = basicStrategyService;
  }

  addTable(id, numPlayers) {
    let tableService = new TableService(numPlayers);
    let actionService = new ActionService(
      tableService,
      this.basicStrategyService
    );
    this.tables[id] = { tableService, actionService };
  }
}

module.exports = AllTableService;
