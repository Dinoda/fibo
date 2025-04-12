import { jsonCall } from 'fibo-browser/call';
import Form, { Field, ButtonField, HiddenField, NumberField } from 'fibo-browser-form';

export default (url, cb) => {
  const call = jsonCall(url, cb);
  const f = new Form('episode', (form, event) => {
    const data = form.getFormData(false, event.submitter);
    call(data);
  });

  f.addField(new Field('name', '', '', {
    required: true,
    placeholder: "Episode's name",
  }));

  f.addField(new Field('description', '', '', {
    placeholder: "Episode's description",
  }));

  f.addField(new HiddenField('work'));

  f.addField(new NumberField('order'));

  f.addField(new ButtonField('send')).text = "Send";

  return f;
};
