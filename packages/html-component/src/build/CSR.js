import { getSimpleData, getMultipleData } from './data.js';

export default class CSRBuildingPatterns {
  constructor(builder) {
    this.builder = builder;
  }

  // COMPONENTS //
  // ========== //
  
  initializeComponent() {
    const node = component.sourceNode;
    const stopOnLock = this.builder.options.stopOnLock;

    if (
    if (component.lock && stopOnLock
  }

  cleanComponent() {
  }

  buildMultiple(elem, component, data, options) {
    const elem = this.getBuildingElement(component);
  }

  buildWithChildren(elem, component, data, options) {
    const elem = this.getBuildingElement(component);

    const elemData = this.getData(component, data, options);

    for (const child of component.children) {
      this.builder.build(elem, child, data, options);
    }
  }

  buildComponent(elem, component, data, options) {
    const elemData = this.getData(component, data, options);

    this.builder.buildComponent(elem, component.component, elemData, options);
  }

  getData(component, data, options) {
    return data[component.data];
  }

  getMultipleData(component, data, options) {
    const cdata = data[component.data];

    return Array.isArray(cdata) ? cdata : Object.values(cdata);
  }

  /**
   *
   */
  build(parent, component, data, options) {
    const elem = getElement(component);
    data = getSimpleData(component, data);

    // Element is multiple
    if (component.multiple) {
      this.builder.build(elem, child, data, options);
    }
    // Element has children
    else if (component.children.length > 0) {
      for (const child of component.children) {
        this.builder.build(elem, child, data, options);
      }
    }
    // Not multiple and no child
    else {
      // And has a component to build
      if (component.component) {
        this.builder.build(elem, component.component, data, options);
      }
      // No component, but data
      else if (component.data) {
        this.setValue(elem, data);
      }
    }

    elem.appendChild(elem);

    if (comp.dataset) {
      for (const id in comp.dataset) {
        const value = comp.dataset[id];

        elem.dataset[id] = value;
      }
    }
  }

  /**
   * Get the building element from a component
   *
   * @param component The component to get the building element from
   *
   * @return The element insertable in the DOM
   */
  getBuildingElement(component) {
    if (component.tag) {
      const e = document.createElement(component.tag);

      for (const attr of component.sourceNode.attributes) {
        e.attributes.setNamedItem(attr.cloneNode());
      }

      return e;
    }

    return component.sourceNode.cloneNode(component.deep);
  }

  /**
   * Sets the value of the element as the given data.
   * If the element is an <input> it is directly as "value", else, it is inputted as "textContent".
   *
   * @param elem The element to set the value of
   * @param data The value to set as
   *
   * @return -
   */
  setValue(element, value) {
    if (elem.matches('input')) {
      elem.value = data;
    } else {
      elem.textContent = data;
    }
  }
}

