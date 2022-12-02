import ConstantsFE from "./ConstantsFE";

class TableUtils {
  findPlayerById(players, playerId) {
    return players.find((p) => {
      return p.id === playerId;
    });
  }

  getCardWidthStyle(cards, id) {
    if (!cards) return;
    console.log("ff", cards, id);
    let isDealer = id === ConstantsFE.DEALER_ID;
    let numCards = isDealer ? cards.length : cards.length - 1;
    let width = ConstantsFE.CARD_WIDTH * (1 + 0.5 * numCards) - 4; // 4 for border
    return { width: `${width}px` };
  }
}

export default new TableUtils();
