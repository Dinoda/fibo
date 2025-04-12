import FieldGroup from '../FieldGroup.js';

import Field from '../Field.js';

/**
 * @param string name Name of the selection field in the group
 * @param object options The options for the group:
 *
 * - choices: A list of the elements to define the available choices
 *    Either a list of pairs (e.g. [['label', 'value'], ['label', 'value']]), or object to be passed to the "defineChoice" option
 * - defineChoice: A callable which returns a pair (['label', 'value']), if defined, it is passed each element of the "choices" option
 * - multiple: A boolean (false by default)
 *    Allow for multiple options to be selected
 *    If expanded, multiple given checkbox instead of radio boxes.
 * - expanded: A boolean (false by default)
 *    Switch from "select" type selection, to boxes (checkbox or radio box list, depending of "multiple" option)
 */
export class SelectionFieldGroup extends FieldGroup {
  constructor(name, options) {
    super("fieldset");

    this.name = name;
    this.options = options;
    this.multiple = !!options.multiple;
    this.expanded = !!options.expanded;

    if (!this.expanded) {
      this.setFields([
        Field.create(name, 'select', options)
      ]);
    } else {
      this.setExpandedFields();
    }
  }

  setExpandedFields() {
    const type = options.multiple ? 'checkbox' : 'radio';
    const choices = this.options.choices;
    for (let i = 0;i < choices.length;i++) {
      this.addField(Field.create(this.name, type, this.options));
    }
  }
}
