import { Component  } from 'fibo-browser';

const paramMatchRegex = /:(\w+)/;

export default class Form extends Component {
  constructor(method, target, callback = () => {}) {
    super('form');

    this.method = method.toUpperCase();
    this.target = target;
    this.callback = callback;

    this.on('submit', (e) => {
      this.submit(e);
    });
  }

  addField(tag, name, type = 'text') {
    this.appendNewComponent(name, tag);

    const dom = this.getChild(name).getDOM();

    dom.name = name;
    dom.type = type;
  }

  addSubmitButton(name = 'submit_button') {
    this.addField('button', name, '');
  }

  submit(event) {
    event.preventDefault();

    const fdata = new FormData(this.__);

    const data = {};

    fdata.forEach((value, key) => {
      data[key] = value;
    });

    let target = this.getTarget(data);

    fetch(target, {
      method: this.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this.callback);
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
