const TableService = require("../services/TableService");

module.exports = (app) => {
  const tableService = new TableService();

  app.get("/deal", (req, res) => {
    let numPlayers = req.query.numPlayers;
    tableService.deal(numPlayers);
    res.send(tableService.showTable());
  });

  app.get("/hit", (req, res) => {
    let playerId = req.query.playerId;
    tableService.hit(playerId);
    console.log("after", tableService.players);
    res.send(tableService.showTable());
  });
};
