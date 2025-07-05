import HTMLComponent from '../Component.js';

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

const datasetToSet = ['tag', 'component', 'callback'];
// Set all simple dataset to the 
export const datasetInitialization = (ds, comp) => {
  for (const [key, value] of Object.entries(ds)) {
    if (datasetToSet.includes(key)) {
      if (value) {
        comp[key] = value;
      } 
      delete ds[key];
    }
  }
};

const canBeCleaned = (comp) => {
  if (! (comp instanceof HTMLComponent)) {
    return true;
  }

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

const canAllChildBeCleaned = (comp) => {
  for (const child of comp.children) {
    if (! canBeCleaned(child)) {
      return false;
    }
  }

  return true;
};

export const clean = (comp, options = {}) => {
  //console.log(comp);
  if (canAllChildBeCleaned(comp)) {
    comp.children = [];
    comp.deep = true;
  }

  for (const ds of options.datasetClean) {
    //console.log('Cleaning dataset:', ds);
    delete comp.sourceNode.dataset[ds];
  }

  for (const attr of options.attributeClean) {
    delete comp.sourceNode.removeAttribute(attr);
  }
};


