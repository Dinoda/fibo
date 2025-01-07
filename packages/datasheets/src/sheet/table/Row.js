import { Component } from "fibo-browser";

export default class TableRow extends Component {
  constructor(di, body, keys, index, data) {
    super("tr");

    this.di = di;
    this.body = body;
    this.keys = keys;
    this.index = index;
    this.data = data;

    const idxCell = new Component("td");
    idxCell.text = this.index;
    this.append(idxCell);

    for (const k of this.keys) {
      const cell = new Component("td");
      cell.text = this.data[k];
      this.append(cell);
    }

    this.appendNewComponent("actionCell", "td");

    if (this.di.updateCall) {
      this.addUpdateBtn();
    }

    if (this.di.deleteCall) {
      this.addDeleteBtn();
    }
  }

  addUpdateBtn() {
    const btn = new Component("button");

    btn.on("click", () => {
      this.body.addForm(this.di.updateCall, this, this.index, this.data);
    });

    btn.text = "Edit";

    this.__actionCell.append(btn);
  }

  addDeleteBtn() {
    const btn = new Component("button");

    btn.on("click", () => {
      this.di.deleteCall(this.index, this.data);
    });
    btn.text = "Delete";

    this.__actionCell.append(btn);
  }
}
