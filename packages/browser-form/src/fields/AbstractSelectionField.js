import Field from '../Field.js';

export default class AbstractSelectionField extends Field {
  static validOptions = [
    'required',
    'multiple',
    'disabled',
  ];

  constructor(name, tag, cls = null, style = {}, options = {}) {
    super(name, tag, cls, style, options, AbstractSelectionField.validOptions);

    this.choices = [];
  }

  // MUTATORS //
  // ======== //
  
  setChoices(choices) {
    for (const k in choices) {
      this.addChoice(choices[k], k);
    }
  }

  addChoice(value, label = null) {
    if (! label) {
      label = value;
    }

    const child = this.createChild(label);

    child.text = label;
    child.__.value = value;

    this.choices.push(child);
  }

  removeChoice(value) {
    const [idx, ch] = this.getChoice(value);

    if (ch) {
      ch.remove();
      this.choices.splice(idx, 1);
    }
  }

  createChild(label) {
    throw new Error('This must be implemented by the child class of "AbstractSelectionField"');
  }

  setMultiple(mult) {
    throw new Error('This must be implemented by the child class of "AbstractSelectionField"');
  }

  // ACCESSORS //
  // ========= //

  getChoice(value) {
    for (let i = 0;i < this.choices.length;i++) {
      const ch = this.choices[i];
      if (ch.__.value == value) {
        return [i, ch];
      }
    }
  }

  getChoiceAt(index) {
    return this.choices[index];
  }

  getChoices() {
    return this.choices;
  }
}
