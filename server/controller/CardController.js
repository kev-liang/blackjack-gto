const Constants = require("../utils/Constants");

module.exports = (app, allTableService, verifyJWT) => {
  app.get("/init", (req, res) => {
    let id = req.query.id;
    let numPlayers = req.query.numPlayers;
    allTableService.addTable(id, numPlayers);
    let tableService = allTableService.tables[id].tableService;
    console.log("Init table:", id);
    res.status(200).send(tableService.showTable());
  });

  app.get("/deal", (req, res) => {
    let id = req.query.id;
    let { tableService } = allTableService.tables[id];
    tableService.deal();
    console.log("Dealing... User:", req.userId);
    res.status(200).send(tableService.showTable());
  });

  app.get("/hit", verifyJWT, (req, res) => {
    let id = req.query.id;
    let { tableService, actionService } = allTableService.tables[id];
    let playerId = req.query.playerId;
    actionService.hit(playerId, !!req.userId);
    console.log("Hit:", playerId, ". User:", req.userId);
    res.status(200).send(tableService.showTable());
  });

  app.get("/stand", verifyJWT, (req, res) => {
    let id = req.query.id;
    let { tableService, actionService } = allTableService.tables[id];
    let playerId = req.query.playerId;
    actionService.stand(playerId, !!req.userId);
    console.log("Stand:", playerId, ". User:", req.userId);
    res.status(200).send(tableService.showTable());
  });

  app.get("/split", verifyJWT, (req, res) => {
    let id = req.query.id;
    let { tableService, actionService } = allTableService.tables[id];
    let playerId = req.query.playerId;
    actionService.split(playerId, !!req.userId);
    console.log("Split:", playerId, ". User:", req.userId);
    res.status(200).send(tableService.showTable());
  });

  app.get("/double", verifyJWT, (req, res) => {
    let id = req.query.id;
    let { tableService, actionService } = allTableService.tables[id];
    let playerId = req.query.playerId;
    actionService.double(playerId, !!req.userId);
    console.log("Double:", playerId, ". User:", req.userId);
    res.status(200).send(tableService.showTable());
  });

  app.get("/surrender", verifyJWT, (req, res) => {
    let id = req.query.id;
    let { tableService, actionService } = allTableService.tables[id];
    let playerId = req.query.playerId;
    actionService.surrender(playerId, !!req.userId);
    console.log("Surrender:", playerId, ". User:", req.userId);
    res.status(200).send(tableService.showTable());
  });

  app.get("/deal-dealer", (req, res) => {
    let id = req.query.id;
    let { tableService, actionService } = allTableService.tables[id];
    actionService.dealDealer();
    res.status(200).send(tableService.showTable());
  });
};
