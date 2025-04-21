import { call } from 'fibo-browser';

import HeightToggleableComponent from '../HeightToggleableComponent.js';

import EpisodeList from './EpisodeList.js';
import createWorkForm from './workForm.js';

import createBasicCallCB from './utils/basicLoad.js';

export default class WorkElement extends HeightToggleableComponent {
  constructor(workList) {
    super('div', '', {
      transition: 'height 1s ease',
      overflow: 'hidden',
    });

    this.workList = workList;

    this.appendNewComponent('title', 'h3');

    this.__title.appendNewComponent('toggle', 'div', '', {
      display: 'inline-block',
      border: '1px solid black',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: '25%',
    });
    this.__title.__toggle.text = "-";
    this.__title.__toggle.on('click', () => {
      console.log('Toggling...');
      this.toggleHeight();
      this.__title.__toggle.text = this.displayed ? '-' : '+';
    });

    this.__title.appendNewComponent('span', 'span');

    this.appendNewComponent('description', 'p');
    this.appendNewComponent('episodes', new EpisodeList(this.workList));
    this.setButtons();
  }

  setData(data) {
    this.data = data;

    this.updateDisplay();
  }

  updateDisplay() {
    this.__title.__span.text = this.data.name;
    this.__description.text = this.data.description;

    this.__episodes.setData({ episodes: this.data.episodes, work: this.data.id });
  }

  setButtons() {
    const updateBtn = this.__title.appendNewComponent('updateBtn', 'button');

    updateBtn.text = "Edit";

    updateBtn.on('click', () => {
      const cb = createBasicCallCB((resp) => {
        if (resp.data) {
          this.workList.updateDataFor(this.data.id);
          f.remove();
        }
      });

      const f = createWorkForm('/api/work/' + this.data.id, cb);

      f.hydrate(this.data);

      f.insertBefore(this.__episodes);
    });

    const deleteBtn = this.__title.appendNewComponent('deleteBtn', 'button');

    deleteBtn.text = "Delete";

    deleteBtn.on('click', () => {
      this.deleteCall();
    });
  }

  downmount() {
    this.deleteCall = call('/api/work/' + this.data.id, 'DELETE', createBasicCallCB((resp) => {
      if (resp.data) {
        this.workList.updateDataFor(this.data.id);
      }
    }));
  }

  upmount() {
    const h = this.getTotalHeight();

    this.setOpenHeight(h);
    this.setClosedHeight(this.getTotalHeight(this.__title));

    this.__.style.height = h + 'px';
  }
}

