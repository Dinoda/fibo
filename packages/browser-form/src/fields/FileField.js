import Field from '../Field.js';

export default class FileField extends Field {
  static validOptions = [
    'required',
    'disabled',
    'type',
  ];

  constructor(name, cls = null, options = {}) {
    super(name, 'input', cls, { ...options, type: "file" }, FileField.validOptions);
  }
}
