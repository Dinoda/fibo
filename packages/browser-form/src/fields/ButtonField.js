import Field from '../Field.js';

export default class ButtonField extends Field {
  static validOptions = [
    'value',
    'disabled',
  ];

  constructor(name, cls = null, options = {}) {
    super(name, 'button', cls, options, ButtonField.validOptions);
  }
}
