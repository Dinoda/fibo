import IPattern from './IPattern.js';

import HTMLComponent from './Component.js';
import Page from './Page.js';

const DEFAULT_PAGE_NAME = '__default';
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
      pattern: IPattern,
      ...options,
    });
  }

  static createSimpleSSR(options = {}) {
    return new HTMLBuilder({
      pattern: SSRPattern,
      ...options,
    });
  }

  static createSimplePR(options = {}) {
    return new HTMLBuilder({
      datasetClean: ['ssr'],
      lockOn: ['client', 'ssr'],
      pattern: SSRPattern,
      ...options,
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
   *  * {array} datasetClean - Dataset elements to clean on components (they will be removed on the resulting HTML)
   *  * {array} attributeClean - Attributes to clean on components (they will be removed on the resulting HTML)
   */
  constructor(options = {}) {
    if (options === IPattern || options.prototype instanceof IPattern) {
      options = { pattern: options };
    }

    if (!options.pattern) {
      options.pattern = IPattern;
    }

    this.options = options;

    this.pages = {};
    this.resources = {};

    this.pattern = new options.pattern(this);

    this.defaultCleanOptions = {
      datasetClean: this.options.datasetClean ?? [],
      attributeClean: this.options.attributeClean ?? [],
    };
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

  getPage(name = null) {
    return this.pages[name ?? DEFAULT_PAGE_NAME];
  }

  getPages() {
    return this.pages;
  }

  // Resources //
  // ========= //

  /**
   * Adds a resource to the builder
   *
   * @param {Element} node - The DOM Element to add as a resource, it will be created as a component through the pattern
   * @param {object} options - The options to pass the pattern for the component creation
   */
  addResource(node, options = {}) {
    const component = this.pattern.createComponent(node, options);
    console.log('Adding new resource:', component);

    if (! this.resources[component.id]) {
      this.resources[component.id] = component;
    } else {
      console.log('Resource already loaded.');
    }
  }

  /**
   * Adds all the direct children of the given doc's body and head part as resources (as long as they have an "id" attribute)
   *
   * @param {Document} doc - The document to get the resources from
   */
  addResourcesFromDocument(doc, options = {}) {
    if (doc.window) {
      doc = doc.window.document;
    }

    for (const node of doc.querySelectorAll('[id]')) {
      this.addResourceFromDocsNode(doc, node, options);
    }

    for (const node of doc.querySelectorAll()) {
      this.addResourceFromDocsNode(doc, node, options);
    }
  }

  addResourceFromDocsNode(doc, node, options) {
    if (node.parentNode == doc.body || node.parentNode == doc.head) {
      this.addResource(node, options);
    }
  }

  // Pages //
  // ===== //

  __isValidPageName(name) {
    return name && (typeof name === 'string' || name instanceof String);
  }

  preparePage(name, page, options = {}) {
    if (! this.__isValidPageName(name)) {
      this.preparePage(DEFAULT_PAGE_NAME, name, page);
      return;
    }
    this.pages[name] = new Page(page, this, options);
  }

  buildPage(pageName, data = {}, options = {}) {
    if (! this.__isValidPageName(pageName)) {
      this.buildPage(DEFAULT_PAGE_NAME, pageName, data);
      return;
    }
    const page = this.pages[pageName];

    const buildOptions = { ...options, ...this.options };

    const all = page.getAllComponents();
    for (const name in all) {
      const { component } = all[name];

      const datum = component.value ? data[component.value] : data;

      const builtComp = this.build(component, data, options);

      page.install(name, builtComp);
    }
  }

  getPageComponent(pageName, componentName = null) {
    if (! componentName) {
      return this.getPageComponent(DEFAULT_PAGE_NAME, pageName);
    }

    return this.pages[pageName].getComponent(componentName);
  }

  getPageHTML(name, formatter = (a) => a) {
    if (!this.__isValidPageName(name)) {
      return this.getPageHTML(DEFAULT_PAGE_NAME, name);
    }
    const page = this.pages[name];

    if (page) {
      if (page.dom) {
        return formatter(page.serialize());
      } else {
        return formatter('<!DOCTYPE HTML>' + page.doc.documentElement.outerHTML);
      }
    }

    return null;
  }

  buildAll(data, options = {}) {
    for (const page in this.pages) {
      this.buildPage(page, data, options);
    }
  }

  build(component, data, options = {}) {
    if (! (component instanceof HTMLComponent)) {
      throw new Error('You can\'t call this method with something else than a component');
    }

    return this.pattern.buildComponent(component, data, options);
  }

  buildComponent(componentName, data, options = {}) {
    if (typeof componentName !== 'string' && !(componentName instanceof String)) {
      throw new Error(`The method "buildComponent" expect a string as the componentName parameter`);
    }
    const component = this.getResource(componentName);

    if (!component) {
      throw new Error(`Couldn't find a component in resources id'd with the name "${componentName}"`);
    }

    return this.build(this.getResource(componentName), data, options);
  }

  // Option Specific Accessors //
  // ====== ======== ========= //

  getCleaningOptions(localOpts = {}) {
    if (localOpts) {
      return {
        datasetClean: localOpts.datasetClean ?? this.defaultCleanOptions.datasetClean,
        attributeClean: localOpts.attributeClean ?? this.defaultCleanOptions.attributeClean,
      };
    }

    return this.defaultCleanOptions;
  }
}
