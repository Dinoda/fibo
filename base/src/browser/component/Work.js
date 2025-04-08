import FormList from './FormList.js';
import Form from './Form.js';

import responseDisplay from './dumb.js';

const selectAllForm = () => {
  const f = new Form("get", "/api/work", responseDisplay);

  f.addSubmitButton("Get all works");

  return f;
};

const selectForm = () => {
  const f = new Form('get', '/api/work/:id', responseDisplay);

  f.addField('input', 'id', 'number');
  f.addSubmitButton("Get this work");

  return f;
};

const insertForm = () => {
  const f = new Form('post', '/api/work', responseDisplay);

  f.addField('input', 'name');
  f.addField('input', 'description');
  f.addSubmitButton("Insert new work");

  return f;
};

const updateForm = () => {
  const f = new Form('post', '/api/work/:id', responseDisplay);

  f.addField('input', 'id', 'number');
  f.addField('input', 'name');
  f.addField('input', 'description');
  f.addSubmitButton("Update this work");

  return f;
};

const deleteForm = () => {
  const f = new Form('delete', '/api/work/:id', responseDisplay);

  f.addField('input', 'id', 'number');
  f.addSubmitButton('Delete this work');

  return f;
};

export default class Work extends FormList { 
  constructor() {
    super('Works');

    this.addForm('selectAll', selectAllForm());
    this.addForm('select', selectForm());
    this.addForm('insert', insertForm());
    this.addForm('update', updateForm());
    this.addForm('delete', deleteForm());
  }
}
