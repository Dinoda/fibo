import db from "../service/database.js";
import { workInsert } from "../models/models.js";

const selectOne = id => {
  return db.query("SELECT * FROM work WHERE id = ?", id);
};

export const get = (req, res) => {
  db.query("SELECT * FROM work").then(data => {
    res.json(data);
  });
};

export const getOne = (req, res) => {
  selectOne(req.param.id).then(data => {
    res.json(data);
  });
};

export const getMeta = (req, res) => {
  res.json({
    id: {
      validator: "integer",
      type: "none"
    },
    name: {
      validator: "!string",
      type: "text"
    },
    description: {
      validator: "string",
      type: "textarea"
    },
    initialURL: {
      validator: "string",
      type: "text"
    }
  });
};

export const post = (req, res) => {
  workInsert(req.body).then(id => {
    selectOne(id).then(data => {
      res.json(data);
    });
  });
};
