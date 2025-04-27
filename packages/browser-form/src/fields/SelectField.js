import AbstractSelectionField from './AbstractSelectionField.js';

export default class SelectField extends AbstractSelectionField {
  constructor(name, cls = null, style = {}, options = {}) {
    super(name, 'select', cls, style, options);
}
  setMultiple(mult) {
    this.__.multiple = mult;
  }
}
