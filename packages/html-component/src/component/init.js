/*
const initialize = (component, options) => {
  const node = component.sourceNode;
  const builder = component.builder;

  if (builder.lockNode(node)) {
    component.lock = true;
    return;
  }

  for (const child of node.childNodes) {
    if (child.nodeType == TEXT_NODE && child.textContent != "") {
      component.children.push(child);
    } else {
      component.children.push(new HTMLComponent(child, builder));
    }
  }

  if ('fbTag' in node.dataset) {
    component.tag = node.dataset.fbTag;
  }

  if ('fbVal' in node.dataset) {
    if (node.dataset.fbVal) {
      component.data = node.dataset.fbVal;
    } else {
      component.data = '__plain';
    }
  }

  if ('fbMultiple' in node.dataset) {
    component.multiple = true;
  }

  if ('fbComponent' in node.dataset) {
    component.component = node.dataset.fbComponent;
  }

  if ('fbCallback' in node.dataset) {
    component.callback = node.dataset.fbCallback;
  }

  for (const child of component.children) {
    if (child instanceof HTMLComponent) {
      initialize(child);
    }
  }

  clean(component);
};

const canBeCleaned = (comp) => {

const canAllChildrenBeCleaned = (component) => {
  for (const child of component.children) {
    if (! canBeCleaned(child)) {
      return false;
    }
  }

  return true;
};

const clean = (component) => {
  const node = component.sourceNode;
  // Dataset cleaning
  console.log(node.dataset);
  delete node.dataset.fbVal;
  delete node.dataset.fbComponent;
  delete node.dataset.fbMultiple;
  delete node.dataset.fbCallback;
  delete node.dataset.fbTag;

  // Child cleaning
  if (canAllChildrenBeCleaned(component)) {
    component.children = [];
    component.deep = true;
  }
};

export default initialize;
*/
