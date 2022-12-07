import ConstantsFE from "./constants/ConstantsFE";

class TableUtils {
  findPlayerById(players, playerId) {
    return players.find((p) => {
      return p.id === playerId;
    });
  }

  getCardWidthStyle(cards, id, dealer) {
    if (!cards) return;
    let isDealer = id === ConstantsFE.DEALER_ID;
    let numCards =
      !isDealer || (dealer && dealer.shouldShowAllCards)
        ? cards.length - 1
        : cards.length;
    let width = ConstantsFE.CARD_WIDTH * (1 + 0.5 * numCards) + numCards * 4; // 4 for border
    return { width: `${width}px` };
  }
}

export default new TableUtils();
