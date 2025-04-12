import { Component } from 'fibo-browser';

export default class Field extends Component {
  static validOptions = [
    'value',
    'placeholder',
    'autocomplete',
    'list',
    'required',
    'pattern',
    'disabled',
    'type',
    'minlength',
    'maxlength'
  ];

  constructor(name, tag = 'input', cls = null, options = {}, validOptions = Field.validOptions) {
    if (! tag) {
      tag = "input";
    }
    super(tag, cls);

    this.name = name;
    this.options = options;
    this.validOptions = validOptions;

    this.resolveCreation();
  }

  setId(id) {
    this.id = id;
    this.__.id = this.id;
  }
  
  resolveCreation() {
    this.__.name = this.name;

    for (const k in this.options) {
      this.setOption(k, this.options[k]);
    }
  }

  getFieldDataInto(data) {
    data[this.getName()] = this.getValue();
  }

  setOption(key, value) {
    if (this.validOptions.includes(key)) {
      this.__[key] = value;
    }

    return this;
  }

  getName() {
    return this.name;
  }

  getValue() {
    return this.__.value;
  }
}

