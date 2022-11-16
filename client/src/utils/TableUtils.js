class TableUtils {
  constructor() {
    console.log("working");
    console.log("fdsa", this.determineDisabled("fdsa"));
  }

  determineDisabled(tableState) {
    return tableState === "lost";
  }
}

export default new TableUtils();
