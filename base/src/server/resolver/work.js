import workCRUD from '../model/work.crud.js';

export const get = (req, res) => {
  if (req.params.id) {
    workCRUD.callOperation('select', { id: req.params.id }).then((work) => {
      res.send(work);
    });
  }

  workCRUD.callOperation('selectAll', {}).then((works) => {
    res.send(works);
  });
};

export const post = (req, res) => {
  if (req.params.id) {
    workCRUD.callOperation('update', req.body).then((success) => {
      res.send(success);
    });
  }

  workCRUD.callOperation('insert', req.body).then((success) => {
    res.send(success);
  });
};

export const del = (req, res) => {
  workCRUD.callOperation('delete', { id: req.params.id }).then((success) => {
    res.send(success);
  });
};
