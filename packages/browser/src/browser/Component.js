/**
 * Component class, used as the base class for most "fibo" html components.
 */
export default class Component {
  /**
   * Constructor.
   *
   * @param tag The tag name of the Component created (this.__), if given (none created if no tag is given)
   * @param cls The class (className) of the Component
   */
  constructor(tag = undefined, cls = "", style = {}) {
    this.mounted = false;
    if (tag instanceof Element) {
      this.__ = tag;
    } else if (tag) {
      this.__ = document.createElement(tag);
    }

    if (this.__) {
      if (cls) {
        this.__.className = cls;
      }

      for (const att in style) {
        console.log(att, ':', style[att]);
        this.__.style[att] = style[att];
      }
    }

    this.children = {};
  }

  /**
   * Add an event listener on the Component
   *
   * @param eventType The event type
   * @param cb The callback when the event is triggered
   *
   * @return None
   */
  addEventListener(eventType, cb) {
    this.on(eventType, cb);
  }

  /**
   * Add a new child Component to this Component
   *
   * @param name The name of the new component (which will be prefixed with "__")
   * @param tag Either a Component, or the tag name for the new component (using "new Component(tag, cls)")
   * @param cls The className of the child component (ignored if "tag" is a Component)
   *
   * @return None
   */
  appendNewComponent(name, tag, cls = "", style = {}) {
    if (!(tag instanceof Component)) {
      tag = new Component(tag, cls, style);
    }

    this.append(tag);

    this["__" + name] = tag;

    this.connectChild(name, tag);

    tag.parent = this;

    return this.getChild(name);
  }

  /**
   * Removes the child.
   *
   * @param child A child's name (string) or directly a Component
   *
   * If left empty, this Component is removed
   *
   * @return None
   */
  remove(child) {
    if (child) {
      if (typeof child == "string" || child instanceof String) {
        child = this.getChild(child);
      }

      if (child) {
        child.remove();
      }

      this.disconnectChild(child);
    } else {
      this.__.remove();
    }
  }

  /**
   *
   */
  disconnectChild(name) {
    if (typeof name == "string" || name instanceof String) {
      this.children[name] = undefined;
      return;
    }

    for (const k in this.children) {
      const c = this.children[k];

      if (c == name) {
        this.children[k] = undefined;
        return;
      }
    }
  }

  connectChild(name, child) {
    this.children[name] = child;

    if (this.mounted && ! child.mounted) {
      setTimeout(() => {
        child.mount();
      }, 0);
    }
  }

  /**
   * Get a child by name
   *
   * @param name The name of the child, as indicated in 'appendNewComponent''s first parameter.
   *
   * @return The child component
   */
  getChild(name) {
    return this.children[name];
  }

  /**
   * Simply append a child to the DOM, doesn't add it to the known children (e.g. can't use 'getChild' on)
   *
   * @param child The child to append without making it known
   *
   * @return None
   */
  append(child) {
    if (child instanceof Component) {
      this.__.appendChild(child.getDOM());
    } else {
      this.__.appendChild(child);
    }
  }

  addAsChild(name, elem) {
    this.children[name] = elem;
  }
  /**
   * Insert this Component before the given Component.
   *
   * @param elem A component or a DOMElement to insert this before.
   *
   * @return None
   */
  insertBefore(elem) {
    if (elem instanceof Component) {
      if (! parent) {
        parent = elem.parent;
      }
      elem = elem.getDOM();
    }

    elem.parentNode.insertBefore(this.getDOM(), elem);
  }

  /**
   * Equivalent to "addEventListener"
   */
  on(eventType, cb) {
    if (!this.__) {
      console.log("No DOM element exist at this time in this Component");
    }
    this.__.addEventListener(eventType, cb);
  }

  /**
   * Trigger the given event type on the Component.
   *
   * The data is added as a CustomEvent detail if present.
   *
   * @param eventType The event to trigger on this Component
   * @param data Optional data to add as the event's detail
   *
   * @return None
   */
  trigger(eventType, data) {
    this.__.dispatchEvent(
      data ? new CustomEvent(eventType, { detail: data }) : new Event(eventType)
    );
  }

  /**
   * Return the DOMElement associated with this Component
   */
  getDOM() {
    return this.__;
  }

  /**
   * Getter for the text content of the Component
   *
   * @return The text content of this Component
   */
  get text() {
    return this.__.textContent;
  }

  /**
   * Setter for the text content of the Component
   *
   * @param text The new text content
   *
   * @return None
   */
  set text(text) {
    this.__.textContent = text;
  }

  /**
   * Getter for the dataset of this Component's DOMElement
   *
   * @return The DOMElement's dataset
   */
  get dataset() {
    return this.__.dataset;
  }

  upmount() {
  }

  downmount() {
  }

  mount() {
    if (! this.mounted) {
      this.downmount();

      for (const c of Object.values(this.children)) {
        if(c.mount) {
          c.mount();
        }
      }

      this.mounted = true;

      setTimeout(() => {
        this.upmount();
      }, 0);
    }
  }
}
