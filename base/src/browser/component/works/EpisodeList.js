import { Component, call } from 'fibo-browser';

import EpisodeElement from './EpisodeElement.js';
import createEpisodeForm from './episodeForm.js';

import basicLoad from './utils/basicLoad.js';

export default class EpisodeList extends Component {
  constructor(workList) {
    super('div');

    this.appendNewComponent('episodes', 'div');
    this.appendNewComponent('form', 'div');

    this.workList = workList;

    this.episodes = [];
    this.episodesById = {};
  }

  setData(data) {
    this.data = data;

    this.updateDisplay();
  }

  updateDisplay() {
    for (const datum of this.data.episodes) {
      this.updateEpisodeDisplay({ ...datum, work: this.data.work });
    }
  }

  updateEpisodeDisplay(data) {
    const epis = this.episodesById[data.id];

    if (epis) {
      epis.setData(data);
      return;
    }

    const name = data.name;
    const episode = new EpisodeElement(this.workList);

    episode.index = this.episodes.length;
    this.episodes[episode.index] = episode;
    this.episodesById[data.id] = episode;

    this.__episodes.appendNewComponent(data.name, episode);

    episode.setData(data);
  }

  downmount() {
    this.displayNewForm();
  }

  displayNewForm() {
    const f = createEpisodeForm('/api/episode', basicLoad((data) => {
      if (data.data) {
        this.workList.updateDataFor(this.data.work);
      }
    }));

    f.hydrate({ work: this.data.work });

    this.__form.appendNewComponent('newform', f);
  }
}

