import { Component } from "fibo-browser";

import TableHead from "./table/Head.js";
import TableBody from "./table/Body.js";

export default class Table extends Component {
  constructor() {
    super("table");
  }

  setDataInterface(di) {
    this.di = di;

    this.appendNewComponent("head", new TableHead(this.di));
    this.appendNewComponent("body", new TableBody(this.di));
  }
}
