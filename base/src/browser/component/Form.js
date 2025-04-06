import { Component  } from 'fibo-browser';

export default class Form extends Component {
  constructor(method, target) {
    super('form');

    this.method = method;
    this.target = target;

    this.on('submit', () => {
      submit();
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

  submit() {

  }
}
