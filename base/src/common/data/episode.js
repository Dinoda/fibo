import Validator from 'fibo-validate';

const validator = new Validator({
  id: 'integer',
  name: 'string',
  description: 'string',
  work: 'object',
  sounds: 'array',
});

export default class Episode {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.work = data.work;
    this.sounds = data.sounds;

    if (! this.validate()) {
      throw new Error("Failure to validate the given data for this episode");
    }
  }

  simpleDisplay() {
    return this.name;
  }

  display() {
    if (this.work) {
      return this.name + " from " + this.work.name;
    }

    return this.simpleDisplay();
  }

  validate() {
    return validator.validate(this);
  }
}
