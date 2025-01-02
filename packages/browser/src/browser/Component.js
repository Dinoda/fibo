export default class Component {
  constructor(tag = undefined, cls = "") {
    if (tag) {
      this.__ = document.createElement(tag);

      this.__.className = cls;
    }
  }

  addEventListener(eventType, cb) {
    this.on(eventType, cb);
  }

  appendNewComponent(name, tag, cls = "") {
    if (!(tag instanceof Component)) {
      tag = new Component(tag, cls);
    }

    this.append(tag);

    this["__" + name] = tag;
  }

  append(child) {
    // Test code
    //try {
    if (child instanceof Component) {
      this.__.appendChild(child.getDOM());
    } else {
      this.__.appendChild(child);
    }
    /* Test code
    } catch (e) {
      console.log(this);
      console.log(child);
    }
    //*/
  }

  on(eventType, cb) {
    if (!this.__) {
      console.log("No DOM element exist at this time in this Component");
    }
    this.__.addEventListener(eventType, cb);
  }

  trigger(eventType, data) {
    this.__.dispatchEvent(
      data ? new CustomEvent(eventType, { detail: data }) : new Event(eventType)
    );
  }

  getDOM() {
    return this.__;
  }

  get text() {
    return this.__.textContent;
  }

  set text(text) {
    this.__.textContent = text;
  }
}
