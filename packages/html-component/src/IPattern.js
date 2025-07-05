import { initializeLockOnCallback, datasetInitialization, clean } from './component/utils.js';

import HTMLComponent from './Component.js';

const TEXT_NODE = 3;

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
    const comp = new HTMLComponent(element, this.builder, options);

    this.initializeComponent(comp, options);

    return comp;
  }

  initializeComponent(comp, options) {
    const node = comp.sourceNode;

    // Lock check
    if (this.lockOn(node)) {
      comp.lock = true;
    }

    // If component not lock, or not stopping on lock
    if (! comp.lock || ! this.stopOnLock) {
      // Initialize the children
      for (const child of node.childNodes) {
        if (child.nodeType == TEXT_NODE) {
          if (! child.textContent.match(/^[\s]*$/)) {
            comp.children.push(child);
          }
        } else {
          comp.children.push(this.createComponent(child, options));
        }
      }
    }

    // Component not locked, analyse it
    if (! comp.lock) {
      const ds = node.dataset;

      // Check if multiple is set, and set on the component
      if ('multiple' in ds) {
        comp.multiple = true;
        delete ds.multiple;
      }

      // Set value at "data-value" value, or "__plain" if there is no value to the attribute
      if ('value' in ds) {
        comp.value = ds.value ? ds.value : '__plain';
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
    } 
    // Component locked, if the inner analysis was not done as it must stop on lock
    else if (this.stopOnLock) {
      // Set as deep cloning
      comp.deep = true;
    }

    // Try to clean the component for what it can
    clean(comp, this.builder.getCleaningOptions(options));
  }

  // Component building //
  // ========= ======== //

  buildComponent(component, data, options) {
    try {
      if (component.multiple) {
        const element = document.createDocumentFragment();

        data = this.getMultipleData(data);

        for (const datum of data) {
          element.appendChild(this.buildSingle(component, datum, options));
        }

        return element;
      }

      return this.buildSingle(component, data, options);
    } catch (err) {
      console.error(`Error during building of component: ${component.id ?? component.sourceNode?.tagName}`);
      console.error(component);

      throw err;
    }
  }

  buildSingle(component, data, options) {
    data = this.resolveData(component, data);

    let element;

    // Component building inside
    if (component.component) {
      element = this.builder.buildComponent(component.component, data, options);
    }
    // Simple component
    else {
      element = this.createElement(component);

      // Has children
      if (component.children.length > 0) {
        for (const child of component.children) {
          element.appendChild(this.buildComponent(child, data, options));
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
    if (data === null || data === undefined) {
      throw new Error(`A data is expected at every step of the component creation, got none for node "${component.sourceNode.tagName}"`);
    }

    if (component.value && component.value !== "__plain") {
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
      if (component.tag.match(/^__/)) {
        const e = document.createDocumentFragment();

        return e;
      }

      const e = document.createElement(component.tag);

      for (const attr of component.sourceNode.attributes) {
        e.attributes.setNamedItem(attr.cloneNode());
      }

      return e;
    }

    return component.sourceNode.cloneNode(component.deep);
  }
}
