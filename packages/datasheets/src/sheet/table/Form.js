import { Component } from "fibo-browser";

const typeToTag = {
  button: "button",
  textarea: "textarea",
  select: "select"
};

export default class TableFormRow extends Component {
  constructor(di, callback, idx, datum = {}) {
    super("tr");

    this.idx = idx;
    this.data = datum;

    this.cb = callback;
    this.formType = di.formType;

    this.__fields = {};

    this.create();
    this.hydrate();
  }

  create() {
    this.addEmpty();

    for (const name in this.formType) {
      const type = this.formType[name];

      if (type != "none") {
        this.addField(name, type);
      } else {
        this.addEmpty();
      }
    }

    this.finish();
  }

  hydrate() {
    if (this.data) {
      for (const name in this.__fields) {
        if (this.data[name]) {
          this.__fields[name].getDOM().value = this.data[name];
        }
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
    const submit = new Component("td");
    const btn = new Component("button");

    submit.append(btn);

    this.append(submit);

    btn.text = "Submit";

    btn.on("click", () => {
      this.submit();
    });
  }

  submit() {
    const data = this.data;

    for (const name in this.__fields) {
      const fld = this.__fields[name];

      data[name] = fld.getDOM().value;
    }

    console.log(this.cb);
    console.log(this);
    if (this.index) {
      this.cb(data);
    } else {
      this.cb(this.index, data);
    }
  }
}
