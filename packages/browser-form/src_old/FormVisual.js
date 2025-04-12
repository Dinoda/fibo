import { Component } from 'fibo-browser';

import FieldGroup from './FieldGroup.js';

export default class FormVisual {
  constructor(group, tag = "fieldset") {
    super(tag);

    this.group = group;

    if (! (group instanceof FieldGroup)) {
      throw new Error('FormVisual expect his first parameter, "group", to be a FieldGroup');
    }
  }

  setLegend(name) {
    if (this.__legend) {
      this.__legend.text = name;
      return;
    }
    this.appendNewComponent('legend', name);
  }

  display() {
    for (const fld of fields) {
      this.appendNewComponent(
    }
  }
}
