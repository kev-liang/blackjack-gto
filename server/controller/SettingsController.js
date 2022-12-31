const TableService = require("../services/TableService");
const Constants = require("../utils/Constants");

module.exports = (app, allTableService) => {
  app.patch("/toggle-dealer-playing", (req, res) => {
    let { tableService } = allTableService.tables[req.query.id];
    let shouldDealDealer = tableService.tableStateService.shouldDealDealer;
    tableService.tableStateService.shouldDealDealer = !shouldDealDealer;
    console.log(`Toggling dealer playing for id: ${req.query.id}`);
    res.status(200).send(tableService.showTable());
  });

  app.patch("/change-num-decks", (req, res) => {
    let { tableService } = allTableService.tables[req.query.id];
    let numDecks = req.query.num;
    tableService.setNumDeck(numDecks);
    console.log(`Changing num decks for id: ${req.query.id}`);
    res.status(200).send(tableService.showTable());
  });

  app.patch("/reset-count", (req, res) => {
    let { tableService } = allTableService.tables[req.query.id];
    tableService.count = 0;
    console.log(`Resetting count for id: ${req.query.id}`);
    res.status(200).send(tableService.showTable());
  });
};
