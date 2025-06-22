import clean from './clean.js';

const create = (node) => {
  const component = {
    tagName: null,
    element: null,
    deep: false,
    children: [],
    data: null,
    multiple: false,
    component: null,
    callback: null,
  };

  if (node.id) {
    node.removeAttribute('id');
  }

  for (const child of node.children) {
    component.children.push(create(child));
  }

  if ('fbTag' in node.dataset) {
    component.tagName = node.dataset.fbTag;
  }

  if ('fbVal' in node.dataset) {
    if (node.dataset.fbVal) {
      component.data = node.dataset.fbVal;
    } else {
      component.data = '__plain';
    }
  }

  if ('fbMultiple' in node.dataset) {
    component.multiple = 'true';
  }

  if ('fbComponent' in node.dataset) {
    component.component = node.dataset.fbComponent;
  }

  if ('fbCallback' in node.dataset) {
    component.callback = node.dataset.fbCallback;
  }

  component.element = node;

  clean(component);

  return component;
};

export default create;

