export default class Page {
  constructor(id, doc, options = {}) {
    this.id = id;
    this.doc = doc;

    this.identifier = options.identifier ?? '[data-fb]';

    this.components = this.doc.querySelectorAll(this.identifier);
  }

  getAllComponents() {
    return this.components;
  }
}
