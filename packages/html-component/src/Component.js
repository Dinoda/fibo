export default class HTMLComponent {
  constructor(node, builder, options = {}) {
    this.sourceNode = node;
    this.builder = builder;

    const idt = options.identifier;

    if (idt) {
      this.id = node.getAttribute(options.identifier);
    }

    if (! this.id) {
      this.id = node.id;
      node.removeAttribute('id');
    }

    this.multiple = false;
    this.lock = false;

    this.children = [];
    this.dataset = {};
  }

  getId() {
    return this.id;
  }

  setDataset(key, value) {
    this.dataset[key] = value;
  }

  getDataset(key) {
    return this.dataset[key];
  }
}
