import Validator from 'fibo-validate';

const validator = new Validator({
  id: 'integer',
  name: 'string',
  description: 'string',
  filename: 'string',
  episode: 'object',
});

export default class Episode {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.episode = data.episode;

    if (! this.validate()) {
      throw new Error("Failure to validate the given data for this sound");
    }
  }

  simpleDisplay() {
    return this.name;
  }

  display() {
    if (this.episode) {
      return `${this.name} (${this.episode.display()})`;
    }

    return this.simpleDisplay();
  }

  validate() {
    return validator.validate(this);
  }
}

