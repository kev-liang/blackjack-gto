class ActionService {
  constructor(tableService) {
    this.tableService = tableService;
  }

  hit(playerId) {
    let player = this.tableService.players.find((p) => {
      return p.id == playerId;
    });
    player.deal(1);
    player.getCardTotal();
    console.log("player", player);
    if (player.cardTotal >= 21) {
      player.playerState = "lost";
      player.isPlaying = false;
    }
    this.tableService.determineTableState();
  }

  stand(playerId) {
    let player = this.tableService.players.find((p) => {
      return p.id == playerId;
    });
    player.isPlaying = false;
    this.tableService.determineTableState();
  }

  double(playerId) {
    let player = this.tableService.players.find((p) => {
      return p.id == playerId;
    });
    //double bet here
    player.deal(1);
    if (player.cardTotal >= 21) {
      player.playerState = "lost";
    }
    player.isPlaying = false;
    this.tableService.determineTableState();
  }
}

module.exports = ActionService;
