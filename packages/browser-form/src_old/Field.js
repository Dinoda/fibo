import { Component } from 'fibo-browser';

class Field extends Component {
  static create(name, type = 'input', options = {}) {
    switch (type) {
      case 'textarea':
        return new TextareaField(name, options);
        break;
      case 'select':
        return new SelectField(name, options);
        break;
      case 'button':
        return new ButtonField(name, options);
        break;
      default: 
        return new InputField(name, type, options);
    }
  }

  constructor(name, type) {
    super(type);

    this.name = name;
    this.__.name = name;
  }

  set value(val) {
    this.value = val;
  }

  get value() {
    return this.value;
  }

  set index(val) {
    this.index = val;
  }

  get index() {
    return this.index;
  }

  set id(val) {
    this.__.id = val;
  }

  get id() {
    return this.__.id;
  }
}

export class InputField extends Field {
  constructor(name, type, options) {
    super(name, 'input');

    if (type != "input") {
      this.__.type = type;
    }
  }
}

export class TextareaField extends Field {
  constructor(name, options) {
    super(name, 'textarea');
  }
}

/**
 * @param string name The name of this field
 * @param object options The options for this field:
 *
 * - multiple: A boolean (false by default)
 *      Allow for multiple options to be selected
 */
export class SelectField extends Field {
  constructor(name, options) {
    super(name, 'select');

    const choices = options.choices;

    for (let i = 0;i < choices.length;i++) {
      const [label, value] = options.choiceDefine(choices[i]);
      const choice = this.appendNewComponent('choice_' + i, 'option');
      choice.text = label;
      choice.getDOM().value = value;

      this.choices = choice;
    }

    this.multiple = !!options.multiple;
    this.getDOM().multiple = this.multiple;
  }

  setValue(value) {
    if (this.multiple) {
      if (! Array.isArray(value)) {
        value = [value];
      }

      for (const choice of this.choices) {
        if (value.includes(choice.getDOM().value)) {
          choice.selected = true;
        }
      }
    } else {
      if (Array.isArray(value)) {
        value = value[0];
      }

      for (const choice of this.choices) {
        if (value == choice.getDOM().value) {
          choice.selected = true;
          return;
        }
      }
    }
  }

  getValue() {
    if (this.multiple) {
      return this.getDOM().selectedOptions.map((opt) => {
        return opt.value;
      });
    }

    return this.getDOM().selectedOptions[0]?.value;
  }

  set value(val) {
    this.setValue(value);
  }

  get value() {
    return this.getValue();
  }
}

export class ButtonField extends Field {
  constructor(name, options) {
    super('button');
  }
}

export default Field;
/*
 * Select choices formatting possibilities
 * Simple object:
choices = {
  'Label' => 'value',
  'Label' => 'value',
};
 * 
 * Pair array: 
choices = [
  ['label', 'value'],
  ['label', 'value']
];
 * Pair array has the advantage to allow any values for both label and value, like functions to be used.
 * Not really. It wouldn't be great.
 * 
 * Array + Callable:
choices = [
  obj1, 
  obj2, 
  obj3
];
callable = (obj) => {return [obj.label, obj.value]; }
 * 
 * Is the best to allow various management, but may not be the best for simplicity.
 */
