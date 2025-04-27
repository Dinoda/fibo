import AbstractSelectionField from './AbstractSelectionField.js';

export default class BoxlistField extends AbstractSelectionField {
  constructor(name, cls = null, style = {}, options = {}) {
    super(name, 'fieldset', cls, style, options);

    this.appendNewComponent('legend', 'legend');
    this.__legend.text = name;

    this.multiple = this.options.multiple;
  }

  createChild(labelText) {
    const box = label.append(new Component('input'));
    
    box.__.type = this.multiple ? 'checkbox' : 'radio';

    return label;
  }

  addChoice(value, label = null) {
    if (! label) {
      label = value;
    }

    const child = this.appendNewComponent(label, 'input');

    child.__.type = this.multiple ? 'checkbox' : 'radio';
  }

  setMultiple(mult) {
    this.multiple = mult;
    if (this.multiple) {
      this.choices.forEach(ch => ch.__.type = "checkbox");
    } else {
      this.choices.forEach(ch => ch.__.type = "radio");
    }
  }
}
