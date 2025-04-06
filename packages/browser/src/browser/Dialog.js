import Component from "./Component.js";

export default class Dialog extends Component {
  constructor(content, options) {
    super("div", "dialog");

    this.__body = new Component(document.getElementsByTagName("body")[0]);
    this.__overlay = new Component("div", "overlay");

    this.appendNewComponent("content", "div", "content");
    this.appendNewComponent("buttons", "div", "buttons");

    if (typeof content == "string" || content instanceof String) {
      this.__content.text = content;
    } else {
      this.__content.append(content);
    }

    for (const key of Object.keys(options.buttons)) {
      const cb = options.buttons[key];

      const btn = new Component("button");
      btn.text = key;

      this.__buttons.appendNewComponent(key, btn);

      if (typeof cb === "function") {
        btn.on("click", () => {
          cb(this.promiseResolve, this.promiseReject, this);
        });
      } else if (cb == "resolve" || cb === true) {
        btn.on("click", () => {
          this.promiseResolve();
        });
      } else if (cb == "reject" || cb === false) {
        btn.on("click", () => {
          this.promiseReject();
        });
      } else {
        throw new Error(
          `Unknown value for button "${key}", got value: "${cb}"`
        );
      }
    }
  }

  display() {
    this.promise = new Promise((res, rej) => {
      this.promiseResolve = res;
      this.promiseReject = rej;

      this.__body.append(this.__overlay);
      this.__body.append(this);
    });

    this.promise.finally(() => {
      this.__overlay.remove();
      this.remove();
    });

    return this.promise;
  }
}
