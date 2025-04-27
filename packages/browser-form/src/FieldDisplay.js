import { Component } from 'fibo-browser';

export default class FieldDisplay {
  constructor() {}

  updateField(field) {
    const dom = new Component('fieldset', 'simple');
    
    field.setDisplay(dom);

    dom.appendNewComponent('label', 'label').__.forHtml = field.name;
    dom.appendNewComponent('field', field);

    return field;
  }
}
