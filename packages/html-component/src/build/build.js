import components from '../components.js';
import { getSimpleData, getMultipleData } from './data.js';

/**
 * TODO: Doc
 */
const setValue = (elem, data) => {
};

/**
 * Creates a new element matching the component given
 *
 * @param comp The component given
 * @return Element An element that can be added to the DOM
 *    It will usually be a clone of the component's element, but can be different if a tag was given to the element (dataset.fbTag), then it will be an element with the given tag, and the element's attributes.
 *    This is in order to allow the creation of specific elements (e.g. <tr>, <td>) needing to have specific parents to be created in a doc, to be used as components.
 */
const getElement = (comp) => {
  if (comp.tagName) {
    const e = document.createElement(comp.tagName);

    for (const attr of comp.element.attributes) {
      e.attributes.setNamedItem(attr.cloneNode());
    }

    return e;
  }

  return comp.element.cloneNode(comp.deep);
};

/**
 * Builds a simple (non-multiple) component inside the given parent node
 *
 * @param parent The parent node
 * @param comp The component object
 * @param data The data to hydrate the component and its children
 * @param options The options given to build this component
 *
 * @return -
 */
const buildSimple = (parent, comp, data, options) => {
  const elem = getElement(comp);
  data = getSimpleData(comp, data);

  // Has children
  if (comp.children.length > 0) {
    for (const child of comp.children) {
      build(elem, child, data, options);
    }
  } 
  // Has no children
  else {
    // Has no children, and has a component to build 
    if (comp.component) {
      build(elem, components[comp.component], data, options);
    } 
    // Has no children, and data to display
    else if (comp.data) {
      setValue(elem, data);
      elem.textContent = data;
    }
  }

  // Appending element
  parent.appendChild(elem);

  // Add dataset infos
  if (comp.dataset) {
    for (const id in comp.dataset) {
      const value = comp.dataset[id];

      elem.dataset[id] = value;
    }
  }

  // Call callbacks
  if (comp.callback && options?.callbacks && comp.callback in options.callbacks) {
    options.callbacks[comp.callback](elem, data);
  }
};

/**
 * Build a multiple component with its data, into the given parent node
 *
 * @param parent The parent node
 * @param comp The component with multiple set to true
 * @param data The data, this needs to be an array, or the multiple build will fail
 * @param options The options for building this component and its children
 *
 * @return -
 */
const buildMultiple = (parent, comp, data, options) => {
  data = getMultipleData(data);

  for (const idx in data) {
    const datum = data[idx];

    build(parent, {
      ...comp,
      multiple: false,
      dataset: {
        index: idx,
      }
    }, datum, options);
  }
};

/**
 * TODO : Take into consideration "component" attribute
 */
const build = (parent, comp, data, options) => {

  // Multiple Component 
  if (comp.multiple) {
    buildMultiple(parent, comp, data, options);
  } 
  // Simple component
  else {
    buildSimple(parent, comp, data, options);
  }
};

export default build;
