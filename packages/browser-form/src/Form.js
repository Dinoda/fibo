import { Component } from 'fibo-browser';

import Field from './Field.js';

import uniqid from './utils/uniqid.js';


export default class Form extends Component {
  /**
   * Form(name, [class,][callback])
   * Constructor for Form.
   *
   * @param string name The name of the form
   * @param string cls The class of the <form> tag
   * @param function cb The callback to manage the form's submit operation (prevent default submit)
   */
  constructor(name, cls = null, cb = null) {
    if (typeof cls === 'function') {
      cb = cls;
      cls = null; 
    }

    super('form', cls);

    this.id = uniqid(name + '-form-', true);
    this.name = name;
    this.fields = {};
    this.fieldByName = {};
    
    if (cb) {
      this.on('submit', (e) => {
        e.preventDefault();

        cb(this, e);
      });
    }
  }

  addField(field) {
    const name = field.getName();

    const fieldId = this.id + '-' + name;

    field.setId(fieldId);

    this.fields[fieldId] = field;
    this.fieldByName[name] = field;

    this.append(field);

    return field;
  }

  getField(name) {
    return this.fieldByName[name];
  }

  getFormData(formData = true, submitter = null) {
    if (formData) {
      return new FormData(this.__, submitter);
    }

    return Object.values(this.fields).reduce((data, fld) => {
      fld.getFieldDataInto(data);
      return data;
    }, {});
  }

  hydrate(data) {
    for (const k in data) {
      this.fieldByName[k]?.setOption('value', data[k]);
    }
  }
}
