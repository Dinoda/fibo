import { Component } from 'fibo-browser';

const uniqid = (prefix = '', random = false) => {
  const sec = Date.now() * 1000 + Math.random() * 1000;
  const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");

  return `${prefix}${id}${random ? Match.trunc(Math.random * 100000000) : ""}`;
}

export default class Form extends Component {
  constructor(name, submitCb = null) {
    super('form');

    this.formId = uniqid('form-', true);
    this.fieldGroupId = 'a';

    this.fields = [];

    if (submitCb) {
      this.on('submit', (e) => {
        e.preventDefault();

        submitCb(this, e);
      });
    }
  }

  getGroupId() {
    const gid = this.formId + '-' + this.fieldGroupId;

    this.fieldGroupId++;
    console.log(this.fieldGroupId);

    return gid;
  }

  addGroup(fieldGroup, view = null) {
    if (!( fieldGroup instanceof FieldGroup)) {
      throw new Error('First parameter of "addGroup" is expected to be a "FieldGroup" object');
    }

    if (view && !(view instanceof FormView)) {
      throw new Error('Second parameter of "addGroup" is expected to be a "FormView" object, or null');
    }
    
    this.fields[fieldGroup.name] = {
      group: fieldGroup, 
      view
    };
  }

  addGroup(name, type = '', options = {}) {
    let field;
    switch(type) {
      case 'number': 
        field = this.appendNewComponent(name, 'input');
        field.getDOM().type = 'number';
        break;
      case 'textarea':
        field = this.appendNewComponent(name, 'textarea');
        break;
      case 'file':
        field = this.appendNewComponent(name, 'input');
        field.getDOM().type = 'file';
        break;
      case 'button':
        field = this.appendNewComponent(name, 'button');
        if (options.value) {
          field.getDOM().value = options.value
        }

        if (options.placeholder) {
          field.text = options.placeholder;
        }
      default:
        field = this.appendNewComponent(name, 'input');
    }

    if (options.placeholder) {
      field.placeholder = options.placeholder;
    }

    if (options.value) {
      field.value = value;
    }

    this.fields.push(field);

    return this;
  }

  addSubmitButton(name, value, options = {}) {
    return this.addField(name, 'button', { ...options, value });
  }

  getField(id) {
    return this.getChild(id) ?? this.fields[id];
  }
}

