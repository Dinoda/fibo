import db from "../service/database.js";
import { workModel, workInsert } from "../models/models.js";

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
  res.json(workModel);
};

export const post = (req, res) => {
  workInsert(req.body).then(id => {
    selectOne(id).then(data => {
      res.json(data);
    });
  });
};

export const postUpdate = (req, res) => {
  workUpdate(req.body).then(data => {
    selectOne(data.id).then(data => {
      res.json(data);
    });
  });
};
