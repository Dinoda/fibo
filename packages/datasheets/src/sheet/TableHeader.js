import { Component } from "fibo-browser";

export default class TableHeader extends Component {
  constructor() {
    super("thead");

    this.appendNewComponent("row", "tr");
  }

  set(head) {
    const idxTh = new Component("th");

    idxTh.text = "Index";

    this.__row.append(idxTh);

    for (const k of head) {
      const th = new Component("th");

      th.text = k;

      this.__row.append(th);
    }
  }
}
