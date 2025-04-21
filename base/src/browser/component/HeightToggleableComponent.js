import { Component } from 'fibo-browser';

export default class HeightToggleable extends Component {
  constructor(tag, cls = '', style = {}) {
    super(tag, cls, style);

    this.displayed = true;
  }

  setOpenHeight(h) {
    this.maxHeight = h;
  }

  setClosedHeight(h) {
    this.minHeight = h;
  }

  toggleHeight(d = null) {
    if (d === null) {
      this.displayed = !this.displayed;
    } else {
      this.displayed = d;
    }

    this.updateHeight();
  }

  updateHeight() {
    const targ = this.displayed ? this.maxHeight : this.minHeight;

    this.getDOM().style.height = targ + 'px';
  }

  getTotalHeight(targ = this) {
    if (targ instanceof Component) {
      targ = targ.getDOM();
    }

    const st = window.getComputedStyle(targ);

    return targ.scrollHeight + parseFloat(st['margin-top']) + parseFloat(st['margin-bottom']);
  }
}
