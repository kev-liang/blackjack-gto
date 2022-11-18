import ConstantsFE from "./ConstantsFE";

class TableUtils {
  determineUserDisabled(table) {
    if (!table) return;
    let player = table.players.find(
      (player) => player.id === ConstantsFE.USER_ID
    );
    return !player.isPlaying;
  }
}

export default new TableUtils();
