import { Component } from 'fibo-browser';

import './Content.scss';

const responseDisplay = async (err, resp) => {
  if (err) {
    console.error(err);
  }

  console.log(resp);
  console.log(await resp.json());
};

export default class Content extends Component {
  constructor() {
    super('div');

    this.appendNewComponent('header', 'header');
    this.appendNewComponent('body', 'section', 'body');
    this.appendNewComponent('footer', 'footer');

    this.__header.appendNewComponent('brand', 'div', 'brand');
    this.__header.__brand.text = 'FiBo';
  }
}
