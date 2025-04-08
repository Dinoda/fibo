import { Component } from 'fibo-browser';
import call, { jsonCall, binaryCall } from 'fibo-browser/call';

const paramMatchRegex = /:(\w+)/;

const capitalize = (t) => {
  return t.charAt(0).toUpperCase() + t.substring(1);
};

export default class Form extends Component {
  constructor(method, target, callback = () => {}) {
    super('form');

    method = method.toUpperCase();

    this.target = target;
    if (method == "FILEPOST") {
      this.dataType = 'form';
      this.fetch = (url, data) => {
        binaryCall(url, callback)(data);
      };
    } else if (method == "POST") {
      this.dataType = '';
      this.fetch = (url, data) => {
        jsonCall(url, callback)(data);
      };
    } else {
      this.dataType = '';
      this.fetch = (url, data) => {
        call(url, method, callback)(data);
      };
    }
    this.group = 0;

    this.on('submit', (e) => {
      this.submit(e);
    });
  }

  newFieldGroup() {
    return this.appendNewComponent('field-group-'+this.group++, 'p');
  }

  addField(tag, name, type = 'text', inner = '') {
    const p = this.newFieldGroup();

    switch (tag) {
      case "input":
      case "select":
        const label = p.appendNewComponent(name+'-label', 'label');
        label.text = capitalize(name);
        break;
      default:
    }

    const fld = p.appendNewComponent(name, tag);
    const dom = fld.getDOM();

    dom.name = name;
    dom.type = type;
    fld.text = inner;
  }

  addSubmitButton(text, name = 'submit_button') {
    this.addField('button', name, '', text);
  }

  submit(event) {
    event.preventDefault();

    const fdata = new FormData(this.__);

    const data = {};

    fdata.forEach((value, key) => {
      data[key] = value;
    });

    let target = this.getTarget(data);

    this.fetch(target, this.getData(fdata));
  }

  getData(fdata) {
    if (this.dataType == 'form') {
      return fdata;
    }
    const data = {};

    fdata.forEach((value, key) => {
      data[key] = value;
    });

    return data;
  }

  getTarget(data) {
    let targ = this.target;

    let match = targ.match(paramMatchRegex);

    while (match) {
      if (! data[match[1]]) {
        throw new Error(`Missing parameter: ${match[1]}`);
      }
      targ = targ.replace(match[0], data[match[1]]);

      match = targ.match(paramMatchRegex);
    }

    return targ;
  }
}
