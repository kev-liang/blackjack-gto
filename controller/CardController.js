const TableService = require("../services/TableService");
const ActionService = require("../services/ActionService");

module.exports = (app) => {
  const tableService = new TableService();
  const actionService = new ActionService(tableService);

  app.get("/deal", (req, res) => {
    let numPlayers = req.query.numPlayers;
    tableService.deal(numPlayers);
    res.send(tableService.showTable());
  });

  app.get("/hit", (req, res) => {
    let playerId = req.query.playerId;
    actionService.hit(playerId);
    console.log("after", tableService.players);
    res.send(tableService.showTable());
  });
};
