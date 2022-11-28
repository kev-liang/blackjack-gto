const Constants = require("../utils/Constants");

module.exports = (app, tableService, actionService) => {
  app.get("/init", (req, res) => {
    let numPlayers = req.query.numPlayers;
    tableService.initTable(numPlayers);
    res.send(tableService.showTable());
  });

  app.get("/deal", (req, res) => {
    tableService.deal();
    res.send(tableService.showTable());
  });

  app.get("/hit", (req, res) => {
    let playerId = req.query.playerId;
    actionService.hit(playerId);
    res.send(tableService.showTable());
  });

  app.get("/stand", (req, res) => {
    let playerId = req.query.playerId;
    actionService.stand(playerId);
    res.send(tableService.showTable());
  });

  app.get("/split", (req, res) => {
    let playerId = req.query.playerId;
    actionService.split(playerId);
    res.send(tableService.showTable());
  });

  app.get("/double", (req, res) => {
    let playerId = req.query.playerId;
    actionService.double(playerId);
    res.send(tableService.showTable());
  });

  app.get("/surrender", (req, res) => {
    let playerId = req.query.playerId;
    actionService.surrender(playerId);
    res.send(tableService.showTable());
  });

  app.get("/deal-dealer", (req, res) => {
    actionService.dealDealer();
    res.send(tableService.showTable());
  });
};
