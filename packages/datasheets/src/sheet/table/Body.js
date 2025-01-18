import { Component } from "fibo-browser";

import TableRow from "./Row.js";

export default class TableBody extends Component {
  constructor(di) {
    super("tbody");

    this.di = di;

    Promise.all([this.di.getKeys(), this.di.getData()]).then(([keys, data]) => {
      this.keys = keys;
      for (const idx in data) {
        const row = new TableRow(this.di, this, keys, idx, data[idx]);

        this.append(row);
      }

      this.appendCreateRow(data.length);
    });
  }

  appendCreateRow(index) {
    const row = new TableRow(this.di, this, this.keys, index, {});

    this.append(row);
  }
}
