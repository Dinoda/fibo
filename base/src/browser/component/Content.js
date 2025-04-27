import { Component } from 'fibo-browser';
import { Field, FieldDisplay, FilterableBoxlistField } from 'fibo-browser-form';


import './Content.scss';

export default class Content extends Component {
  constructor() {
    super('div');

    this.appendNewComponent('header', 'header');
    this.appendNewComponent('body', 'section', 'body');
    this.appendNewComponent('footer', 'footer');

    this.__header.appendNewComponent('brand', 'div', 'brand');
    this.__header.__brand.text = 'FiBo';

    const fd = new FieldDisplay();

    this.__body.appendNewComponent('input', fd.updateDisplay(new Field()));

    const field = this.__body.appendNewComponent('select', new FilterableBoxlistField('field', '', {}, { multiple: true }));

    field.setChoices({
      kaamelott: 1,
      "Reflet d'Acide": 2,
      "R.E.P.O.": 3,
      "Hardspace Shipbreaker": 4,
      "Monster Hunter": 5,
      "Monster Hunter Wilds": 6
    });
  }
}
