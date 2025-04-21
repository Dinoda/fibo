import { diceCoefficient } from 'dice-coefficient';
import { randomLogReverse } from './random.js';

class Proximity {
  constructor(str) {
    this.search = str;
    this.best = 0;
    this.values = [];
  }

  add(value, data) {
    const coeff = diceCoefficient(this.search, value) * value.length;

    this.values.push({ coeff, data });

    if (coeff > this.best) {
      this.best = coeff;
    }
  }

  getResources() {
    if (! this.filtered) {
      return this.getFiltered();
    }

    return this.filtered;
  }

  getRandomWeighted() {
    if (!this.sorted) {
      this.sorted = true;

      this.values.sort((a, b) => {
        return b.coeff - a.coeff;
      });
    }

    return randomLogReverse(this.values).data;
  }
}

const cache = {};

export default (str, resources) => {
  str = str.toLowerCase();
  if (! cache[str]) {
    const p = new Proximity(str);

    for (const idx in resources) {
      p.add(resources[idx].name, resources[idx]);
    }

    cache[str] = p;
  }

  return cache[str].getRandomWeighted();
};
