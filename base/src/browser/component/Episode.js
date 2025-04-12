import { Component, call } from 'fibo-browser';
import createEpisodeForm from './episodeForms.js';

class EpisodeElement extends Component {
  constructor(data) {
    super('div');

    this.data = data;
  }
}

