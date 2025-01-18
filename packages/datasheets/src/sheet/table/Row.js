import { Component, Dialog } from "fibo-browser";

const STATE_IDLE = 0;
const STATE_EDITED = 1;
const STATE_REFRESHING = 2;

export default class TableRow extends Component {
  constructor(di, body, keys, index, data = {}) {
    super("tr");

    this.di = di;
    this.body = body;
    this.keys = keys;
    this.index = index;

    this.appendNewComponent("state", "span", "material-symbols-outlined");
    this.appendNewComponent("deleteBtn", "span", "material-symbols-outlined");

    this.__deleteBtn.text = "close";
    this.__deleteBtn.on("click", () => {
      const dlg = new Dialog("Do you confirm you want to delete this line ?", {
        buttons: {
          Confirm: true,
          Cancel: false
        }
      });

      dlg.display().then(() => {
        this.di
          .delete(this.index, this.data)
          .then(() => {
            this.remove();
          })
          .catch(e => {
            console.error(e);
          });
      });
    });

    this.setData(data);
  }

  setData(data) {
    this.data = data;

    this.getDOM().replaceChildren();

    this.__cells = [];
    this.__fields = [];

    this.updateState(STATE_IDLE);

    this.create();

    if (this.isDataEmpty()) {
      this.__deleteBtn.getDOM().style.display = "none";
    } else {
      this.__deleteBtn.getDOM().style.display = null;
    }
  }

  isDataEmpty() {
    return Object.getOwnPropertyNames(this.data).length == 0;
  }

  create() {
    const formType = this.di.formType;

    this.addCell("indexCell").text = this.index;

    for (const k of this.keys) {
      const cell = this.addCell(k);

      if ("none" == formType[k]) {
        cell.text = this.data[k];
      } else {
        this.addField(k, cell, formType[k]);
      }
    }

    const fc = this.addCell("finalCell", "state");

    fc.append(this.__state);
    fc.append(this.__deleteBtn);

    this.display();
  }

  addCell(name, cn) {
    this.appendNewComponent(name, "td", cn);

    const cell = this.getChild(name);

    this.__cells.push(cell);

    return cell;
  }

  updateState(newState) {
    this.state = newState;

    const cl = this.__state.getDOM().classList;
    switch (this.state) {
      case STATE_IDLE:
        cl.toggle("valid", true);
        cl.toggle("running", false);
        this.__state.text = "check_circle";
        break;
      case STATE_EDITED:
        cl.toggle("valid", false);
        cl.toggle("running", false);
        this.__state.text = "edit_note";
        break;
      case STATE_REFRESHING:
        cl.toggle("valid", false);
        cl.toggle("running", true);
        this.__state.text = "refresh";
        break;
      default:
        cl.toggle("valid", false);
        cl.toggle("running", false);
        this.__state.text = "question_mark";
        console.warn(`Unknown state given as row ${this.index}'s new state`);
    }
  }

  addField(key, cell, formType) {
    let form;

    switch (formType) {
      case "textarea":
      case "select":
        form = new Component(formType);
        break;
      default:
        form = new Component("input");

        form.getDOM().type = formType;
        break;
    }

    cell.getDOM().classList.add("form");
    cell.appendNewComponent("field", form);

    const field = cell.__field;

    field.getDOM().name = key;
    field.getDOM().value = this.data[key] ?? "";
    this.__fields.push(field);

    field.on("change", () => {
      this.onChange();
    });

    field.on("keydown", () => {
      this.onChange();
    });
  }

  onChange() {
    this.updateState(STATE_EDITED);

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.submit();
    }, 2000);
  }

  display() {
    for (const cell of this.__cells) {
      this.append(cell);
    }
  }

  addDeleteBtn() {
    const btn = new Component("button");

    btn.on("click", () => {
      this.di.deleteCall(this.index, this.data);
    });
    btn.text = "Delete";

    this.__actionCell.append(btn);
  }

  submit() {
    const submitData = { ...this.data };

    for (const fld of this.__fields) {
      const dom = fld.getDOM();

      submitData[dom.name] = dom.value;
    }

    this.updateState(STATE_REFRESHING);

    if (!this.isDataEmpty()) {
      this.di.update(this.index, submitData).then(data => {
        this.setData(data);
      });
    } else {
      this.di.create(submitData).then(data => {
        this.setData(data);
        this.body.appendCreateRow(this.index + 1);
      });
    }
  }
}
