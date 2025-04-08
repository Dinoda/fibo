import { resolve } from 'fibo-server';
import episodeCRUD from '../model/episode.crud.js';

export const get = (req, res) => {
  if (req.params.id) {
    resolve(res, episodeCRUD.callOperation('select', req.params));
    return;
  }

  resolve(res, episodeCRUD.callOperation('selectAll', {}));
};

export const post = (req, res) => {
  if (req.params.id) {
    resolve(res, episodeCRUD.callOperation('update', req.body));
    return;
  }

  resolve(res, episodeCRUD.callOperation('insert', req.body));
};

export const del = (req, res) => {
  resolve(res, episodeCRUD.callOperation('delete', req.params));
};
