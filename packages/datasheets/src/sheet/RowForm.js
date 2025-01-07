import { Component } from "fibo-browser";

export default class RowForm extends Component {
  constructor(submitCb, meta, datum) {
    super("tr");

    this.submitCb = submitCb;

    this.meta = meta;
    this.datum = datum;

    this.__fields = [];

    this.appendNewComponent("indexCol", "td");

    this.create(meta);

    if (this.datum) {
      this.hydrate();
    }
  }

  create(meta) {
    for (const name in meta) {
      let type = meta[name];

      if (type != "none") {
        this.addField(name, type);
      } else {
        this.addEmpty();
      }
    }

    this.finish();
  }

  hydrate() {
    for (const name in this.__fields) {
      if (this.datum[name]) {
        this.__fields.getDOM().value = this.datum[name];
      }
    }
  }

  addEmpty() {
    this.append(new Component("td"));
  }

  addField(name, type) {
    const field = new Component(typeToTag[type] ?? "input");

    this.__fields[name] = field;

    field.getDOM().name = name;
    this.appendNewComponent(name, "td");
    this.getChild(name).appendNewComponent("field", field);
  }

  finish() {
    this.__submitBtn = new Component("button");

    this.__submitBtn.text = "Submit";

    this.__submitBtn.on("click", () => {
      this.submit();
    });

    this.append(this.__submitBtn);
  }

  submit() {
    const data = this.datum ?? {};

    for (const k in this.__fields) {
      const fld = this.__fields[k];

      data[fld.getDOM().name] = fld.getDOM().value;
    }

    this.submitCb(this, data);
  }
}
