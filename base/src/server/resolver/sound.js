import { resolve } from 'fibo-server';
import soundCRUD from '../model/sound.crud.js';

export const get = (req, res) => {
  if (req.params.id) {
    resolve(res, soundCRUD.callOperation('select', req.params));
    return;
  }

  resolve(res, soundCRUD.callOperation('selectAll', {}));
};

export const post = (req, res) => {
  const file = req.file;

  // Multer returns a "req.body" without prototype, we must get a standard object for the system to work normally
  // Done using {...req.body} here.
  if (req.params.id) {
    resolve(res, soundCRUD.callOperation('update', { ...req.body }));
    return;
  }

  resolve(res, soundCRUD.callOperation('insert', { ...req.body }));
};

export const del = (req, res) => {
  resolve(res, soundCRUD.callOperation('delete', req.params));
};
