import { Component } from "fibo-browser";

export default class TableBodyRow extends Component {
  constructor(idx, data) {
    super("tr");

    this.idx = idx;
    this.data = data;
    console.log(idx, data);
  }

  set(headers) {
    this.addCell(this.idx);

    for (const key of headers) {
      this.addCell(this.data[key]);
    }

    this.appendNewComponent("action", "td");
  }

  addCell(text) {
    const cell = new Component("td");

    cell.text = text;

    this.append(cell);
  }

  addAction(name, label, cb) {
    this.__action.appendNewComponent(name, "button");

    const btn = this.__action.getChild(name);

    btn.text = label;

    btn.on("click", () => {
      cb(this.idx, this.datum);
    });
  }

  removeAction(name) {
    this.__action.remove(name);
  }
}
