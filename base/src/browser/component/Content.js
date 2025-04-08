import { Component } from 'fibo-browser';

import Work from './Work.js';
import Episode from './Episode.js';
import Sound from './Sound.js';

import './Content.scss';

const responseDisplay = async (err, resp) => {
  if (err) {
    console.error(err);
  }

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

    this.__body.appendNewComponent('work_forms', new Work());
    this.__body.appendNewComponent('episode_forms', new Episode());
    this.__body.appendNewComponent('sound_forms', new Sound());
  }
}
