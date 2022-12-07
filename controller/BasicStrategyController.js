module.exports = (app, basicStrategyService) => {
  app.get("/basic-strategy-charts", (req, res) => {
    res.send(basicStrategyService.strategy);
  });
};
