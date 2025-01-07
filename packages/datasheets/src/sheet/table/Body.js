import { Component } from "fibo-browser";

import TableRow from "./Row.js";
import TableFormRow from "./Form.js";

export default class TableBody extends Component {
  constructor(di) {
    super("tbody");

    this.di = di;

    Promise.all([this.di.getKeys(), this.di.getData()]).then(([keys, data]) => {
      for (const idx in data) {
        const row = new TableRow(this.di, this, keys, idx, data[idx]);

        this.append(row);
      }

      if (this.di.createCall) {
        this.addCreateBtn(keys.length + 1);
      }
    });
  }

  addCreateBtn(width) {
    const row = new Component("tr");
    const cell = new Component("td");

    row.append(cell);

    cell.text = "+";
    cell.getDOM().colSpan = width;
    cell.on("click", () => {
      this.addForm(this.di.createCall);
    });
  }

  addForm(cb, replaceChild = null, index = null, data = null) {
    this.__form = new TableFormRow(this.di, cb, index, data);

    if (replaceChild) {
      this.getDOM().replaceChild(
        this.__form.getDOM(),
        replaceChild instanceof Component ? replaceChild.getDOM() : replaceChild
      );
    } else {
      this.append(this.__form);
    }
  }
}
