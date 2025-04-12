import { Component } from 'fibo-browser';

export default class FieldGroup extends Component {
  constructor(form, tag = 'fieldset', cls = undefined) {
    const id = form.getGroupId();
    super(tag, cls);

    this.form = form;

    this.fields = {};
    this.length = 0;
  }

  getField(name) {
    return this.fields[name];
  }
  
  getFields() {
    return this.fields;
  }

  addField(field) {
    field.index = this.length;

    this.fields[field.name] = field;
    this.fields[field.index] = field;

    field.id = this.id + this.length;

    this.length++;
  }

  removeField(field) {
    this.fields[field.index] = undefined;
    this.fields[field.name] = undefined;

  }
}
