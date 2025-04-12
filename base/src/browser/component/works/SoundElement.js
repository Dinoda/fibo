import { Component, call } from 'fibo-browser';

import createSoundForm from './soundForm.js';

import createBasicCallCB from './utils/basicLoad.js';

export default class SoundElement extends Component {
  constructor(workList) {
    super('div');

    this.workList = workList;

    this.appendNewComponent('title', 'h5');
    this.__title.appendNewComponent('span', 'span');
    this.appendNewComponent('description', 'p');
    this.appendNewComponent('sound', 'audio');
    this.setButtons();
  }

  setData(data) {
    this.data = data;

    this.__title.__span.text = this.data.name;
    this.__description.text = this.data.description;

    const audio = this.__sound.getDOM();

    audio.src = '/api/sound/file/' + this.data.id;
    audio.controls = true;
  }

  setButtons() {
    const updateBtn = this.__title.appendNewComponent('updateBtn', 'button');
    updateBtn.text = "Edit";
    updateBtn.on('click', () => {
      console.log(this.data);
      const cb = createBasicCallCB((resp) => {
        if (resp.data) {
          this.workList.updateDataFor(this.data.work);
          f.remove();
        }
      });

      const f = createSoundForm('/api/sound/' + this.data.id, cb);

      f.hydrate(this.data);

      this.appendNewComponent('updateForm', f);
    });

    const deleteBtn = this.__title.appendNewComponent('deleteBtn', 'button');
    deleteBtn.text = "Delete";
    deleteBtn.on('click', () => {
      this.deleteCall();
    });
  }

  downmount() {
    this.deleteCall = call('/api/sound/' + this.data.id, 'DELETE', createBasicCallCB((resp) => {
      if (resp.data) {
        this.workList.updateDataFor(this.data.work);
      }
    }));
  }
}
