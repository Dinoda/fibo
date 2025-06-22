// Initialization function for the lockOn method of the pattern
export const initializeLockOnCallback = (lockOn) => {
  return (element) => {
    for (const l of lockOn) {
      if (l in element.dataset) {
        return true;
      }
    }

    return false;
  };
};

const datasetToSet = ['tag', 'value', 'component', 'callback'];
// Set all simple dataset to the 
export const datasetInitialization = (ds, comp) => {
  for (const [key, value] of Object.entries(ds)) {
    if (key in datasetToSet) {
      comp[key] = value;
      delete ds[key];
    }
  }
};

const canBeCleaned = (comp) => {
  if (comp.children.length > 0 
    || comp.value
    || comp.multiple 
    || comp.component 
    || comp.callback 
    || comp.tag
    || (comp.dataset 
      && comp.dataset.length > 0)
  ) 
{
    return false;
  }

  return true;
};

export const clean = (comp) => {
  for (const child of comp.children) {
    if (! canBeCleaned(child)) {
      return;
    }
  }

  if (! comp.tag) {
    component.children = [];
    component.deep = true;
  }
};


