import BoxlistField from './BoxlistField.js';

export default class FilterableBoxlistField extends BoxlistField {
  constructor(name, cls = null, style = {}, options = {}) {
    super(name, cls, style, options);

    this.appendNewComponent('filter', 'input');

    this.__filter.type = "text";
    this.__filter.on('change', this.filter);

    this.texts = {};
  }

  addChoice(value, label = null) {
    if (! label) {
      label = value;
    }

    const child = this.appendNewComponent(label, 'input');

    child.text = label;
    child.__.value = value;

    this.texts[label] = child;
    this.choices.push(child);
  }
  
  removeChoice(value) {
    const [idx, ch] = this.getChoice(value);

    if (ch) {
      ch.remove();
      delete this.texts[ch.text];
      this.choices.splice(idx, 1);
    }
  }

  filter() {
    const str = this.__filter.value.toLowerCase();

    for (const label in this.texts) {
      if (label.toLowerCase().includes(str)) {
        this.texts[label].style.display = undefined;
      } else {
        this.texts[label].style.display = 'hidden';
      }
    }
  }
}
