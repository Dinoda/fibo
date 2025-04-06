import { Component } from 'fibo-browser';

import Form from './Form.js';

import './Content.scss';

const responseDisplay = async (resp) => {
    console.log(resp);
    console.log(await resp.json());
};

const selectAllForm = () => {
  const f = new Form("get", "/api/work", responseDisplay);

  f.addSubmitButton();
  f.__submit_button.text = "Get all works";

  return f;
};

const selectForm = () => {
  const f = new Form('get', '/api/work/:id', responseDisplay);

  f.addField('input', 'id', 'number');
  f.addSubmitButton();
  f.__submit_button.text = "Get this work";

  return f;
};

const insertForm = () => {
  const f = new Form('post', '/api/work', responseDisplay);

  f.addField('input', 'name');
  f.addField('input', 'description');
  f.addSubmitButton();
  f.__submit_button.text = "Insert new work";

  return f;
};

export default class Content extends Component {
  constructor() {
    super('div');

    this.appendNewComponent('header', 'header');
    this.appendNewComponent('body', 'section', 'body');
    this.appendNewComponent('footer', 'footer');

    this.__header.appendNewComponent('brand', 'div', 'brand');

    this.__header.__brand.text = 'FiBo';

    this.__body.appendNewComponent('selectAll', selectAllForm());
    this.__body.appendNewComponent('select', selectForm());
    this.__body.appendNewComponent('insert', insertForm());
  }
}
