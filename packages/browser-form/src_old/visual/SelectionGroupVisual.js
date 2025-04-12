import SelectionFieldGroup from '../fieldGroups/SelectionGroup.js';
import FormVisual from '../FormVisual.js';

export default class SelectionGroupVisual extends FormVisual {
  constructor(name, group) {
    super(group);

    this.name = name;
    this.group = group;

    this.setLegend(name);

    if (! (group instanceof SelectionFieldGroup) {
      throw new Error(`This field group visual is only adapted for "SelectionFieldGroup"`);
    }
  }

}
