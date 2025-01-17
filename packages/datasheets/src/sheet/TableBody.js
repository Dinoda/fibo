import { Component } from "fibo-browser";
import RowForm from "./RowForm.js";
import TableBodyRow from "./TableBodyRow.js";

export default class TableBody extends Component {
  constructor() {
    super("tbody");

    this.__rows = [];
  }

  setData(dtInterface) {
    this.data = dtInterface;

    this.editable = this.data.isEditable();

    this.display();
  }

  display() {
    Promise.all([this.data.getKeys(), this.data.getData()]).then(
      ([keys, data]) => {
        this.set(keys, data, this.data.update(), this.data.delete());

        const crt = this.data.create();

        if (crt) {
          this.createBtn(keys.length + 1, crt);
        }
      }
    );
  }

  createBtn(width, cb) {
    this.appendNewComponent("createRow", "tr", "add");
    this.__createRow.appendNewComponent("cell", "td");

    this.__createRow.__cell.getDOM().colSpan = width;
    this.__createRow.__cell.text = "+";

    console.log(this.__createRow.__cell);
    this.__createRow.__cell.on("click", () => {
      const f = new RowForm(cb, this.data.formType);

      this.append(f);
      this.append(this.__createRow);
    });
  }

  set(headers, data, update, del) {
    for (const key in data) {
      const item = data[key];
      const row = new TableBodyRow(key, item);

      row.set(headers);

      this.__rows[key] = row;

      this.append(row);

      if (update) {
        row.addAction("update", "Edit", update);
      }

      if (del) {
        row.addAction("delete", "Delete", del);
      }
    }
  }

  getRow(idx) {
    return this.__rows[idx];
  }

  createForm(cb, datum) {
    this.form = new RowForm(this.meta, cb, datum);

    return this.form;
  }

  setUpdatable(bl) {
    const cb = bl ? "Add a callback" : null;

    for (const row of this.__rows) {
      row.setUpdatable(cb);
    }
  }

  setDeletable(bl) {
    const cb = bl ? "Add a callback" : null;

    for (const row of this.__rows) {
      row.setDeletable(cb);
    }
  }
}
