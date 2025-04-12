import { Component } from 'fibo-browser';

import SoundElement from './SoundElement.js';
import createSoundForm from './soundForm.js';

import basicLoad from './utils/basicLoad.js';

export default class SoundList extends Component {
  constructor(workList) {
    super('div');

    this.appendNewComponent('sounds', 'div');
    this.appendNewComponent('form', 'div');

    this.workList = workList;

    this.sounds = [];
    this.soundsById = {};
  }

  setData(data) {
    this.data = data;

    this.updateDisplay();
  }

  updateDisplay() {
    for (const datum of this.data.sounds) {
      this.updateSoundDisplay({ ...datum, work: this.data.work });
    }
  }

  updateSoundDisplay(data) {
    const snd = this.soundsById[data.id];

    if (snd) {
      snd.setData(data);
      return;
    }

    const name = data.name;
    const sound = new SoundElement(this.workList);

    sound.index = this.sounds.length;
    this.sounds[sound.index] = sound;
    this.soundsById[data.id] = sound;

    this.__sounds.appendNewComponent(name, sound);

    sound.setData(data);
  }

  downmount() {
    this.displayNewForm();
  }

  displayNewForm() {
    const f = createSoundForm('/api/sound', basicLoad((data) => {
      if (data.data) {
        this.workList.updateDataFor(this.data.work);
      }
    }));

    f.hydrate({ episode: this.data.episode });

    this.__form.appendNewComponent('newform', f);

  }
}
