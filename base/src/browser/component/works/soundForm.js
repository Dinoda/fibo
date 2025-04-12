import { binaryCall } from 'fibo-browser/call';
import Form, { Field, ButtonField, FileField, HiddenField } from 'fibo-browser-form';

export default (url, cb) => {
  const call = binaryCall(url, cb);
  const f = new Form('sound', (form, event) => {
    const data = form.getFormData(true, event.submitter);
    call(data);
  });

  f.addField(new Field('name', '', '', {
    required: true,
    placeholder: "Sound's name",
  }));
  
  f.addField(new Field('description', '', '', {
    placeholder: "Sound's description",
  }));

  f.addField(new FileField('sound'));

  f.addField(new HiddenField('episode'));

  f.addField(new ButtonField('send')).text = "Send";

  return f;
};
