import IPattern from './IPatter.js';

import Component from './Component.js';

import initialize from './component/init.js';

/**
 * This class is simply here to manage the whole system.
 *
 * It contains:
 *  * The pattern system, the component creation and building system.
 *  * The pages, containing the defined page with its components, by name
 *  * The resources, containing the components that can be built on the various pages / other components, by name
 *
 * It also received and keep the options given for the whole process.
 */
export default class HTMLBuilder {

  static createBasic(options = {}) {
    return new HTMLBuilder({ 
      ...options,
      pattern: IPattern,
    });
  }

  static createSimpleSSR(options = {}) {
    return new HTMLBuilder({
      ...options,
      pattern: SSRPattern,
    });
  }

  /**
   * The builder's constructor
   *
   * @constructor
   * @param {[sub]class IPattern|object} options - The options of this builder, if IPattern, similar to { pattern: options }
   *
   *  * {[sub]class IPattern} pattern - The pattern instance for the builder, IPattern by default, or any child class
   *  * {array|callback(Element): boolean} lockOn - Specific "lockOn" for the pattern class (default depending from the IPattern class)
   *  * {boolean} stopOnLock - If the pattern must stop on a locking element (default to true)
   */
  constructor(options = {}) {
    if (options === IPattern || options.prototype instanceof IPattern) {
      options = { pattern: options };
    }

    if (!options.pattern) {
      options.pattern = IPattern;
    }

    this.pattern = new options.pattern(this);

    this.options = options;

    this.pages = {};
    this.resources = {};
  }

  // Simple Accessor & Mutators //
  // ====== ======== = ======== //

  /**
   * Returns a resource for the given id
   *
   * @param {string} id - The resource's id
   */
  getResource(id) {
    return this.resources[id];
  }

  /**
   * Adds a resource to the builder
   *
   * @param {Element} node - The DOM Element to add as a resource, it will be created as a component through the pattern
   * @param {string} id - The id of the resource in the builder, default to the node's "id" attribute
   */
  addResource(node, id = null) {
    const component = new HTMLComponent(node, this);

    this.resources[id ?? component.id] = component;
  }

  /**
   * Adds all the direct children of the given doc's body and head part as resources (as long as they have an "id" attribute)
   *
   * @param {Document} doc - The document to get the resources from
   */
  addResourcesFromDocument(doc) {
    for (const node of doc.querySelectorAll('[id]')) {
      if (node.parentNode == doc.body || node.parentNode == doc.head) {
        this.addResource(node);
      }
    }
  }

  // Pages //
  // ===== //

  preparePage(name, page, options = {}) {
    this.pages[name] = new Page(name, page, options);
  }

  buildPage(pageName, data, options = {}) {
    const buildOptions = { ...options, ...this.options };

    buildOptions.type = this.type;

    const components = page.querySelectorAll('[data-fb]')

  }

  build(parent, component, data, options = {}) {

  }

  buildComponent(componentName, data, options = {}) {
  }
}
