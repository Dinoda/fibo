import FormList from './FormList.js';
import Form from './Form.js';

import responseDisplay from './dumb.js';

const selectAllForm = () => {
  const f = new Form("get", "/api/episode", responseDisplay);

  f.addSubmitButton("Get all episodes");

  return f;
};

const selectForm = () => {
  const f = new Form("get", "/api/episode/:id", responseDisplay);

  f.addField("input", "id", "number");
  f.addSubmitButton("Get this episode");

  return f;
};

const insertForm = () => {
  const f = new Form("post", "/api/episode", responseDisplay);

  f.addField("input", "name");
  f.addField("input", "description");
  f.addField("input", "work", "number");
  f.addSubmitButton("Insert new episode");

  return f;
};

const updateForm = () => {
  const f = new Form("post", "/api/episode/:id", responseDisplay);

  f.addField("input", "id", "number");
  f.addField("input", "name");
  f.addField("input", "description");
  f.addField("input", "work", "number");
  f.addSubmitButton("Update this episode");

  return f;
};

const deleteForm = () => {
  const f = new Form("delete", "/api/episode", responseDisplay);

  f.addField("input", "id", "number");
  f.addSubmitButton("Delete this episode");

  return f;
};

export default class Episode extends FormList {
  constructor() {
    super("Episodes");

    this.addForm("selectAll", selectAllForm());
    this.addForm("select", selectForm());
    this.addForm("insert", insertForm());
    this.addForm("update", updateForm());
    this.addForm("delete", deleteForm());
  }
}
