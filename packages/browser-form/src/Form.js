import { Component } from 'fibo-browser';

import Field from './Field.js';

import uniqid from './utils/uniqid.js';


export default class Form extends Component {
  /**
   * @inherit
   *
   * Form(name, [class,][style,][callback])
   * Constructor for Form.
   *
   * @param string name The name of the form
   * @param string cls The class of the <form> tag
   * @param object style The style automatically added to the form
   * @param function cb The callback to manage the form's submit operation (prevent default submit)
   */
  constructor(name, cls = null, style = {}, cb = null) {
    if (typeof cls !== 'string' && ! (cls instanceof String)) {
      if (typeof cls === 'function') {
        cb = cls;
        style = {};
        cls = null; 
      } else {
        style = cls;
        cls = null;
      }
    } else if (typeof style === 'function') {
      cb = style;
      style = {};
    }

    super('form', cls, style);

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

  /**
   * Adds a field object (expected to be an instance of Field) to the fields of the form
   *
   * @param Field field The field to append to this form
   * @return The field, to allow to construct directly in addField
   */
  addField(field) {
    const name = field.getName();

    const fieldId = this.id + '-' + name;

    field.setId(fieldId);

    this.fields[fieldId] = field;
    this.fieldByName[name] = field;

    this.append(field);

    return field;
  }

  /**
   * Get a field by its name
   *
   * @param string name The name of the desired field
   *
   * @return Field The field with this name, undefined else
   */
  getField(name) {
    return this.fieldByName[name];
  }

  /**
   * Get this form's data
   *
   * @param boolean formData Get the data in FormData object (default, value 'true'), or a simple object (value 'false')
   * @param object submitter The submitter button/input[type="submit"], added to the data
   *
   * @return object An object, FormData if first parameter is "true" (default)
   */
  getFormData(formData = true, submitter = null) {
    if (formData) {
      return new FormData(this.__, submitter);
    }

    const data = Object.values(this.fields).reduce((data, fld) => {
      fld.getFieldDataInto(data);
      return data;
    }, {});

    if (submitter) {
      data[submitter.name] = submitter.value;
    }

    return data;
  }

  /**
   * Hydrate the form fields with the data given
   *
   * @param object data The data to insert into this form's fields
   * @return -
   */
  hydrate(data) {
    for (const k in data) {
      this.fieldByName[k]?.setOption('value', data[k]);
    }
  }
}
