const TableService = require("../services/TableService");
const Constants = require("../utils/Constants");

module.exports = (app, allTableService) => {
  app.patch("/toggle-dealer-playing", (req, res) => {
    let { tableService } = allTableService.tables[req.query.id];
    let shouldDealDealer = tableService.tableStateService.shouldDealDealer;
    tableService.tableStateService.shouldDealDealer = !shouldDealDealer;
    res.status(200).send(tableService.showTable());
  });

  app.patch("/change-num-decks", (req, res) => {
    let { tableService } = allTableService.tables[req.query.id];
    let numDecks = req.query.num;
    tableService.setNumDeck(numDecks);
    res.status(200).send(tableService.showTable());
  });

  app.patch("/change-num-decks", (req, res) => {
    let { tableService } = allTableService.tables[req.query.id];
    let numDecks = req.query.num;
    tableService.setNumDeck(numDecks);
    res.status(200).send(tableService.showTable());
  });

  app.patch("/reset-count", (req, res) => {
    let { tableService } = allTableService.tables[req.query.id];
    tableService.count = 0;
    res.status(200).send(tableService.showTable());
  });
};
