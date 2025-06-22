import { initializeLockOnCallback, datasetInitialization, clean } from './component/utils.js';

export default class IPattern {

  static lockOn = [];

  /**
   * Creates the pattern, this will use the builder to initialize the "lockOn" and "stopOnLock" options.
   *
   * The "lockOn" can be an array of "dataset" values that will lock the component, or
   * it can be a callback matching: (Element): boolean => {}, indicating if the element must be locked
   *
   * @param {Builder} builder - The builder this pattern belongs to
   */
  constructor(builder) {
    this.builder = builder;
    this.lockOn = builder.options.lockOn ?? IPattern.lockOn;
    this.stopOnLock = builder.options.stopOnLock ?? true;

    if (typeof this.lockOn !== "function") {
      if (Array.isArray(this.lockOn)) {
        this.lockOn = initializeLockOnCallback(this.lockOn);
      } else {
        throw new Error(`"lockOn" option must be an array or a callback, got "${typeof this.lockon}"`);
      }
    }
  }

  // Component creation //
  // ========= ======== //

  createComponent(element, options = {}) {
    const comp = new HTMLComponent(element, this.builder);

    this.initializeComponent(comp, options);

    return comp;
  }

  initializeComponent(comp, options) {
    const node = comp.sourceNode;

    // Lock check
    if (this.lockOn(node)) {
      comp.lock = true;

      // Stop on lock, automatically build in depth
      if (this.stopOnLock) {
        comp.deep = true;
        return;
      }
    }

    // Initialize the children
    for (const child of node.childNodes) {
      if (child.nodeType == TEXT_NODE && child.textContent != "") {
        component.children.push(child);
      } else {
        component.children.push(this.createComponent(child, options));
      }
    }

    // This part is to do only if the element is not locked
    if (! comp.lock) {
      const ds = node.dataset;

      // Check if multiple is set, and set on the component
      if ('multiple' in ds) {
        comp.multiple = true;
        delete ds.multiple;
      }

      // Check all standard dataset to set in the component
      datasetInitialization(ds, comp);

      // Call the callbackOnInit callback indicated in the element
      if (ds.callbackOnInit) {
        if (options.callbacks[ds.callbackOnInit]) {
          options.callbacks[ds.callbackOnInit](comp, this.builder);
        } else {
          throw new Error(`Callback not found on component init "${comp.callbackInit}"`);
        }
      }

      // Try to clean the component for what it can
      clean(comp);
    }
  }

  // Component building //
  // ========= ======== //

  buildComponent(component, data, options) {
    if (component.multiple) {
      const element = document.createDocumentFragment();

      data = this.getMultipleData(data);

      for (const datum in data) {
        element.appendChild(this.buildSingle(component, data, options));
      }

      return element;
    }

    return this.buildSingle(component, data, options);
  }

  buildSingle(component, data, options) {
    data = this.resolveData(component, data);

    let element;

    // Component building inside
    if (component.component) {
      const element = this.builder.buildComponent(component.component, data, options);
    }
    // Simple component
    else {

      const element = this.createElement(component);

      // Has children
      if (component.children.length > 0) {
        for (const child of component.children) {
          this.buildComponent(child, data, options);
        }
      } 
      // No child
      else {
        if (component.value) {
          if (element.tagName === 'INPUT') {
            element.value = this.getSingleData(data);
          } else {
            element.textContent = this.getSingleData(data);
          }
        }

        if (component.dataset) {
          for (const [k, v] of Object.entries(component.dataset)) {
            element.dataset[k] = v;
          }
        }
      }
    }

    if (component.callback) {
      options.callbacks[component.callback](element, component, this.builder);
    }

    return element;
  }

  resolveData(component, data) {
    if (component.value) {
      return data[component.value];
    }

    return data;
  }

  getSingleData(data) {
    if (typeof data === 'string' || data instanceof String) {
      return data;
    }

    return JSON.stringify(data);
  }

  getMultipleData(data) {
    if (Array.isArray(data)) {
      return data;
    }

    return Object.values(data);
  }

  createElement(component) {
    if (component.tag) {
      const e = document.createElement(component.tag);

      for (const attr of component.sourceNode.attributes) {
        e.attributes.setNamedItem(attr.cloneNode());
      }

      return e;
    }

    return component.sourceNode.cloneNode(component.deep);
  }
}
