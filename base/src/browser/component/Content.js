import { Component } from "fibo-browser";

import Datasheets from "fibo-datasheets";
import Storage from "fibo-browser-store";

import "./Content.scss";

export default class Content extends Component {
  constructor() {
    super("div");

    this.appendNewComponent("header", "header");
    this.appendNewComponent("body", "section", "body");
    this.appendNewComponent("footer", "footer");

    this.__header.appendNewComponent("brand", "div", "brand");

    this.__header.__brand.text = "FiBo";

    const sheets = new Datasheets(
      {
        work: new Storage("work", {
          urls: {
            get: "/api/work",
            meta: "/api/work/meta",
            create: "/api/work",
            update: "/api/work/:id"
          }
        })
      },
      {
        selections: {
          Works: "work"
        }
      }
    );

    this.__body.append(sheets);
  }
}
