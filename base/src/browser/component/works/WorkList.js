import { Component, call } from 'fibo-browser';

import WorkElement from './WorkElement.js';
import createWorkForm from './workForm.js';

import basicLoad from './utils/basicLoad.js';

export default class WorkList extends Component {
  constructor() {
    super('article');

    this.appendNewComponent('works', 'div');
    this.appendNewComponent('form', 'div');

    this.works = [];
    this.worksById = {};

    this.call = call('/api/work/full', 'get', basicLoad((data) => {
      console.log(data);
      this.data = data.data;

      this.resetDisplay();
    }));

    this.loadData();
  }

  loadData() {
    this.call();
  }

  updateDataFor(id) {
    console.log(id);
    const work = this.worksById[id];
    console.log(work);

    if (work) {
      call('/api/work/full/' + id, 'get', basicLoad((resp) => {
        work.setData(resp.data[0]);
      }))();
    }
  }

  updateWorkDisplay(index, data) {
    if (! this.works[index]) {
      const name = data.name;
      const work = new WorkElement(this);

      work.index = index;
      this.works[index] = work;
      this.worksById[data.id] = work;

      this.__works.appendNewComponent(name, work);

      work.setData(data);
      return;
    }

    this.works[index].setData(data);
  }

  resetDisplay() {
    this.works.forEach((w) => {
      this.__works.remove(w);
    });

    this.works = [];
    this.worksById = {};

    for (const datum of this.data) {
      this.updateWorkDisplay(this.works.length, datum);
    }

    this.mount();
  }

  displayNewForm() {
    this.__form.appendNewComponent('new_form', createWorkForm('/api/work', basicLoad((data) => {
      if (data.data) {
        this.loadData();
      }
    })));
  }

  downmount() {
    console.log('WorkList dm');
    this.displayNewForm();
  }
}
