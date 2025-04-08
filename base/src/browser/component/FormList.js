import { Component } from 'fibo-browser';

import './FormList.scss';

export default class FormList extends Component {
  constructor(title) {
    super('div', 'flist');

    this.appendNewComponent('title', 'h3');
    this.appendNewComponent('list', 'div');

    this.__title.text = title;
  }

  addForm(name, form) {
    this.__list.appendNewComponent(name, form);
  }

  getForm(name) {
    this.__list.getChild(name);
  }
}
