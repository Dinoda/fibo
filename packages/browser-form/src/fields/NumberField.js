import Field from '../Field.js';

export default class NumberField extends Field {
  static validOptions = [
    "value",
    "placeholder",
    "required",
    "disabled",
    "type",
    "min",
    "max"
  ];

  constructor(name, cls = null, options = {}) {
    super(name, 'input', cls, {...options, type: "number" }, NumberField.validOptions);
  }

  setMin(value) {
    this.__.min = value;
  }

  getMin() {
    return this.__.min;
  }

  setMax(value) {
    this.__.max = value;
  }

  getMax() {
    return this.__.max;
  }

  getValue() {
    return parseFloat(this.__.value);
  }
}
