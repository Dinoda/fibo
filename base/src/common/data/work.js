import Validator from 'fibo-validate';

const validator = new Validator({
  id: "integer",
  name: "string",
  description: "string",
  episodes: "array",
});

export default class Work {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.episodes = data.episodes;

    if (! this.validate()) {
      throw new Error("Failure to validate the given data for this work");
    }
  }

  simpleDisplay() {
    return this.name;
  }

  display() {
    return this.simpleDisplay();
  }

  validate() {
    return validator.validate(this);
  }
}

