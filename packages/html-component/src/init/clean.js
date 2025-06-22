const cleanDataset = (elem) => {
  delete elem.dataset.fbVal;
  delete elem.dataset.fbComponent;
  delete elem.dataset.fbMultiple;
  delete elem.dataset.fbCallback;
  delete elem.dataset.fbTag;
};

const canBeCleaned = (child) => {
  if (child.children.length > 0 || child.data || child.multiple || child.component || child.callback || child.tagName) {
    return false;
  }

  return true;
};

export default (comp) => {
  cleanDataset(comp.sourceNode);

  for (const child of comp.children) {
    if (! canBeCleaned(child)) {
      return;
    }
  }

  if (! comp.tagName) {
    comp.children = [];
    comp.deep = true;
  }
};
