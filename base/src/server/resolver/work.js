import { resolve } from 'fibo-server';
import workCRUD from '../model/work.crud.js';

export const get = (req, res) => {
  if (req.params.id) {
    resolve(res, workCRUD.callOperation('select', { id: req.params.id }));

    return;
  }

  resolve(res, workCRUD.callOperation('selectAll', {}));
};

export const post = (req, res) => {
  if (req.params.id) {
    resolve(res, workCRUD.callOperation('update', req.body));
    return;
  }

  resolve(res, workCRUD.callOperation('insert', req.body));
};

export const del = (req, res) => {
  resolve(res, workCRUD.callOperation('delete', { id: req.params.id }));
};
