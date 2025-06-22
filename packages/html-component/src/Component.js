export default class HTMLComponent {
  constructor(node, builder) {
    this.sourceNode = node;
    this.builder = builder;

    this.id = node.id;
    node.removeAttribute('id');

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
