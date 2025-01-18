import { Component } from "fibo-browser";

export default class TableHead extends Component {
  constructor(di) {
    super("thead");

    this.di = di;

    this.appendNewComponent("row", "tr");

    this.di.getKeys().then(keys => {
      const cell = new Component("th");
      cell.text = "Index";
      this.__row.append(cell);

      for (const k of keys) {
        const c = new Component("th");
        c.text = k;
        this.__row.append(c);
      }

      this.__row.appendNewComponent("action", "th");
    });
  }
}
