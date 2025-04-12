import { jsonCall } from 'fibo-browser/call';
import Form, { Field, ButtonField, HiddenField } from 'fibo-browser-form';

const createWorkForm = (url, cb) => {
  const call = jsonCall(url, cb);
  const insert = new Form('work-insert', (form, event) => {
    const data = form.getFormData(false, event.submitter);
    call(data);
  });

  insert.addField(new Field('name', '', '', {
    required: true,
    placeholder: "Work's name",
  }));

  insert.addField(new Field('description', '', '', {
    placeholder: "Work's description"
  }));

  insert.addField(new ButtonField('send')).text = "Send";

  return insert;
};

export default createWorkForm;

