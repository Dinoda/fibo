import Field from '../Field.js';

export default class HiddenField extends Field {
  static validOptions = [
    'value',
    'type',
  ];

  constructor(name, cls = null, options = {}) {
    super(name, 'input', cls = null, { ...options, type: "hidden", }, HiddenField.validOptions);
  }
}
