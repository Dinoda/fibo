export default class Page {
  constructor(doc, builder, options = {}) {
    if (doc.window) {
      this.doc = doc.window.document;
      this.dom = doc;
    } else {
      this.doc = doc;
    }
    this.builder = builder;

    this.identifier = options.identifier ?? '[data-fb]';

    this.options = options;
    this.components = {};

    this.defId = 0;

    this.initializeComponents();
  }

  initializeComponents() {
    const toBuild = this.doc.querySelectorAll(this.identifier);

    for (const tb of toBuild) {
      let id = tb.id ?? td.getAttribute(this.identifier);

      if (! id || id === "") {
        id = this.defId++;
      }

      this.components[id] = {
        component: this.builder.pattern.createComponent(tb, this.options),
        location: tb,
      };
    }
  }

  getAllComponents() {
    return this.components;
  }

  getComponent(id) {
    return this.components[id];
  }

  install(name, builtComponent) {
    const loc = this.components[name].location;

    loc.replaceWith(builtComponent);

    this.components[name].location = builtComponent;
  }

  serialize() {
    if (! this.dom) {
      throw new Error(`Can't serialize a page in browser`);
    }

    return this.dom.serialize();
  }
}
