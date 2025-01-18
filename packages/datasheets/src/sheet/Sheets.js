import { Component } from "fibo-browser";

import Selector from "./Selector.js";
import Table from "./Table.js";
import DataInterface from "./DataInterface.js";

let id = 0;

export default class Datasheets extends Component {
  constructor(stores, options = {}) {
    super("div", "datasheet");

    this.id = id++;
    this.storageName = "datasheet-storage-" + this.id;
    this.data = {};
    this.current = null;
    this.stores = stores;
    this.options = options;

    this.appendNewComponent(
      "selector",
      new Selector(options.style ?? "simple", this.getSelections(options))
    );
    this.appendNewComponent("table", new Table());

    this.__selector.on("change", () => {
      const vl = this.__selector.getDOM().value;
      this.change(vl);

      sessionStorage.setItem(this.storageName, vl);
    });

    setTimeout(() => {
      const stValue = sessionStorage.getItem(this.storageName);

      if (stValue) {
        this.__selector.setValue(stValue);
        this.change(stValue);
      }
    }, 0);
  }

  getSelections(options) {
    let sels = options.selections;

    if (!sels) {
      sels = Object.keys(this.store).reduce((obj, val) => {
        obj[val] = val;
      }, {});
    }

    return {
      None: null,
      ...sels
    };
  }

  change(value) {
    this.current = value;

    if (!this.data[this.current]) {
      this.data[this.current] = new DataInterface(this.stores[this.current]);
    }

    const dt = this.data[this.current];

    dt.load();

    this.__table.setDataInterface(dt);
  }
}
