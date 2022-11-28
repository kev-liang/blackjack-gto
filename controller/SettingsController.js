const TableService = require("../services/TableService");
const Constants = require("../utils/Constants");

module.exports = (app, tableService) => {
  app.patch("/toggle-dealer-playing", (req, res) => {
    let shouldDealDealer = tableService.tableStateService.shouldDealDealer;
    tableService.tableStateService.shouldDealDealer = !shouldDealDealer;
    res.send(tableService.showTable());
  });
};
