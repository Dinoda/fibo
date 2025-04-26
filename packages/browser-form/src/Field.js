import { Component } from 'fibo-browser';

export default class Field extends Component {
  static validOptions = [
    'value',
    'placeholder',
    'autocomplete',
    'list',
    'required',
    'pattern',
    'disabled',
    'type',
    'minlength',
    'maxlength'
  ];

  /**
   * @inherit
   * Field constructor
   *
   * @param name The field's name, used in the html tag, and the returned data
   * @param tag The field's tag, default to 'input'
   * @param cls
   * @param style
   * @param options The options (attribute) for this field
   * @param validOptions The valid options for this field, usually defined by the Field child-class themselves
   */
  constructor(name, tag = 'input', cls = null, style = {}, options = {}, validOptions = Field.validOptions) {
    if (! tag) {
      tag = "input";
    }
    super(tag, cls, style);

    this.name = name;
    this.options = options;
    this.validOptions = validOptions;

    this.resolveCreation();
  }

  /**
   * Sets the id for this field and its html tag
   * Usually defined automatically by the form in "addField"
   *
   * @param string id The id of the field
   * @return -
   */
  setId(id) {
    this.id = id;
    this.__.id = this.id;
  }
  
  /**
   * Resolve the name and options in the html tag
   *
   * @return -
   */
  resolveCreation() {
    this.__.name = this.name;

    for (const k in this.options) {
      this.setOption(k, this.options[k]);
    }
  }

  /**
   * Returns the data in the given object
   *
   * @param object data The data to add this field's name and value pair to
   * @return -
   */
  getFieldDataInto(data) {
    data[this.getName()] = this.getValue();
  }

  /**
   * Adds an option (attribute) to the html tag, if it belongs (options is present inside the "validOptions" array)
   *
   * @param string key The attribute (option) name
   * @param any value The value of the attribute
   * @return Field this
   */
  setOption(key, value) {
    if (this.validOptions.includes(key)) {
      this.__[key] = value;
    }

    return this;
  }

  /**
   * Returns the name of this field
   *
   * @return string The name of this field
   */
  getName() {
    return this.name;
  }

  /**
   * Returns the current value of this field
   *
   * @return string The value of this field
   */
  getValue() {
    return this.__.value;
  }
}

