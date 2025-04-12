import { Component, call } from 'fibo-browser';

import SoundList from './SoundList.js';
import createEpisodeForm from './episodeForm.js';

import createBasicCallCB from './utils/basicLoad.js';

export default class EpisodeElement extends Component {
  constructor(workList) {
    super('div');

    this.workList = workList;

    this.appendNewComponent('title', 'h4');
    this.__title.appendNewComponent('span', 'span');
    this.appendNewComponent('description', 'p');
    this.appendNewComponent('sounds', new SoundList(this.workList));
    this.setButtons();
  }

  setData(data) {
    this.data = data;

    this.updateDisplay();
  }

  updateDisplay() {
    this.__title.__span.text = this.data.name;
    this.__description.text = this.data.description;

    this.__sounds.setData({ sounds: this.data.sounds, work: this.data.work, episode: this.data.id });
  }

  setButtons() {
    const updateBtn = this.__title.appendNewComponent('updateBtn', 'button');

    updateBtn.text = "Edit";

    updateBtn.on('click', () => {
      const cb = createBasicCallCB((resp) => {
        if (resp.data) {
          this.workList.updateDataFor(this.data.work);
          f.remove();
        }
      });

      const f = createEpisodeForm('/api/episode/' + this.data.id, cb);

      f.hydrate(this.data);

      f.insertBefore(this.__sounds);
      this.addAsChild('updateForm', f);
    });

    const deleteBtn = this.__title.appendNewComponent('deleteBtn', 'button');

    deleteBtn.text = "Delete";

    deleteBtn.on('click', () => {
      this.deleteCall();
    });
  }

  downmount() {
    this.deleteCall = call('/api/episode/' + this.data.id, 'DELETE', createBasicCallCB((resp) => {
      if (resp.data) {
        this.workList.updateDataFor(this.data.work);
      }
    }));
  }
}
