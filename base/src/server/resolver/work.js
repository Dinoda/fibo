import { resolve } from 'fibo-server';
import workCRUD from '../model/work.crud.js';

export const get = (req, res) => {
  console.log('work:get');
  if (req.params.id) {
    resolve(res, workCRUD.callOperation('select', { id: req.params.id }));

    return;
  }

  resolve(res, workCRUD.callOperation('selectAll', {}));
};

export const getFull = (req, res) => {
  console.log('work:getFull');
  if (req.params.id) {
    resolve(res, workCRUD.callOperation('selectFull', req.params));
    return;
  }

  resolve(res, workCRUD.callOperation('selectAllFull', {}));
};

export const post = (req, res) => {
  console.log('work:post');
  if (req.params.id) {
    resolve(res, workCRUD.callOperation('update', { ...req.body, id: req.params.id }));
    return;
  }

  resolve(res, workCRUD.callOperation('insert', { ...req.body, id: req.params.id }));
};

export const del = (req, res) => {
  console.log('work:del');
  resolve(res, workCRUD.callOperation('delete', { id: req.params.id }));
};
