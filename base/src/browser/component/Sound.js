import FormList from './FormList.js';
import Form from './Form.js';

import responseDisplay from './dumb.js';

const selectAllForm = () => {
  const f = new Form('get', '/api/sound', responseDisplay);

  f.addSubmitButton('Get all sounds');

  return f;
};

const selectForm = () => {
  const f = new Form('get', '/api/sound/:id', responseDisplay);

  f.addField('input', 'id', 'number');
  f.addSubmitButton('Get this sound');

  return f;
};

const insertForm = () => {
  const f = new Form('filepost', '/api/sound', responseDisplay);

  f.addField('input', 'name');
  f.addField('input', 'description');
  f.addField('input', 'sound', 'file');
  f.addField('input', 'episode', 'number');
  f.addSubmitButton('Insert new sound');

  return f;
};

const updateForm = () => {
  const f= new Form('filepost', '/api/sound/:id', responseDisplay);

  f.addField('input', 'id', 'number');
  f.addField('input', 'name');
  f.addField('input', 'description');
  f.addField('input', 'sound', 'file');
  f.addField('input', 'episode', 'number');
  f.addSubmitButton('Update this sound');

  return f;
};

const deleteForm = () => {
  const f = new Form('delete', '/api/sound/:id', responseDisplay);

  f.addField('input', 'id', 'number');
  f.addSubmitButton('Delete this sound');

  return f;
};

export default class Sound extends FormList { 
  constructor() {
    super('Sounds');

    this.addForm('selectAll', selectAllForm());
    this.addForm('select', selectForm());
    this.addForm('insert', insertForm());
    this.addForm('update', updateForm());
    this.addForm('delete', deleteForm());
  }
}
