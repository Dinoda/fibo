const create = {
  select: () => {}
};
export default class Selector extends Component {
  constructor(selections, options = {}) {
    super();

    this.selections = selections;
    this.options = options;
    this.options.style = this.options.style || "select";
  }
}
