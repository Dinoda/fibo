import { Component } from "fibo-browser";

const options = {
  select: data => {
    const elems = [];

    let values = data;
    let labels = data;

    if (!Array.isArray(data)) {
      values = Object.values(data);
      labels = Object.keys(data);
    }

    for (const idx in values) {
      elems[idx] = new Component("option");

      elems[idx].__.value = values[idx];
      elems[idx].text = labels[idx];
    }

    return elems;
  }
};

export default class Selector extends Component {
  constructor(style, selections) {
    style = style == "simple" ? "select" : "select";

    super(style);

    for (const elem of options[style](selections)) {
      this.append(elem);
    }
  }

  setValue(value) {
    this.getDOM().value = value;
  }
}
