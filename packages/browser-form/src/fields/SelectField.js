import Field from '../Field.js';

export default class SelectField extends Field {
  static validOptions = [
    "value",
    "required",
    "disabled",
    "multiple",
    "choices",
  ];

  constructor(name, cls = null, options = {}, choices = {}) {
    super(name, 'select', cls);

    this.choices = [];

    for (const k in choices) {
      this.addChoice(choices[k], k);
    }
  }

  addChoice(value, label = null) {
    if (! label) {
      label = value;
    }

    const child = this.appendNewComponent(label, 'option');
    
    child.text = label;
    child.__.value = value;

    this.choices.push(child);
  }

  removeChoice(value) {
    const opt = this.getOption(value);

    if (opt) {
      opt.remove();

      const idx = this.options.indexOf(opt);

      this.options.splice(idx, 1);
    }
  }

  getChoices() {
    return this.choices;
  }

  getChoiceAt(index) {
    return this.choices[index];
  }

  getChoice(value) {
    for (const opt of this.choices) {
      if (opt.__.value == value) {
        return opt;
      }
    }

    return null;
  }

  setMultiple(m) {
    this.__.multiple = !!m;
  }

  getMultiple() {
    return this.__.multiple;
  }
}
