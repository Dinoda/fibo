import { Model } from "./src/index.js";

Model.createModel({
  name: "work",
  fields: {
    id: {
      type: "integer",
      null: false,
      key: true,
      auto: true
    },
    name: {
      type: "string",
      range: 255,
      null: false
    }
  }
});

Model.createModel({
  name: "tag",
  fields: {
    id: {
      type: "integer",
      null: false,
      key: true,
      auto: true
    },
    name: {
      type: "string",
      range: 255,
      null: false
    }
  }
});

Model.createModel({
  name: "tag_model",
  fields: {
    tag: {
      type: "integer",
      null: false,
      references: {
        model: "tag",
        field: "id"
      }
    }
  }
});

const work = Model.createEntity("work", {
  name: "Your crush catches you"
});

console.log(work.validate());
console.log(work.detailedValidation());

/*
import validate from "./src/tool/validation.js";
import validationParameters from "./src/tool/validationParams.js";

const validParams = validationParameters({
  id: "!integer",
  name: "!string",
  description: "string",
  major: "integer",
  minor: "number"
});

console.log(validParams);

const value = {
  id: "1",
  name: "",
  description: null,
  major: null,
  minor: 1.12
};

validate(value, validParams);
*/
