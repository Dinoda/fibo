import fs from 'fs/promises';
import mime from 'mime-types';
import path from 'path';

import { resolve } from 'fibo-server';

import soundCRUD from '../model/sound.crud.js';


const soundsPath = path.resolve('sounds');

export const get = (req, res) => {
  if (req.params.id) {
    resolve(res, soundCRUD.callOperation('select', req.params));
    return;
  }

  resolve(res, soundCRUD.callOperation('selectAll', {}));
};

export const post = (req, res) => {
  const file = req.file;

  if (file) {
    console.log(file);
    let ext = path.extname(file.originalname);

    if (!ext) {
      ext = '.' + mime.extension(file.mimetype);
    }

    const filepath = path.join(soundsPath, file.filename);
    const newFilePath = filepath + ext;

    fs.rename(filepath, newFilePath).then(() => {
      // Multer returns a "req.body" without prototype, we must get a standard object for the system to work normally
      // Done using {...req.body} here.
      if (req.params.id) {
        resolve(res, soundCRUD.callOperation('update', { filename: path.basename(newFilePath), ...req.body, id: req.params.id }));
        return;
      }

      resolve(res, soundCRUD.callOperation('insert', { filename: path.basename(newFilePath), ...req.body }));
    }).catch(err => {
        res.status(500).send({ status: 500, err: 'Internal server error', data: null });
      });
  } else {
    if (req.params.id) {
      resolve(res, soundCRUD.callOperation('updateNoFile', { ...req.body, id: req.params.id }));
    } else {
      res.status(400).send({ status: 400, err: "Bad request", data: null });
    }
  }
};

export const del = (req, res) => {
  resolve(res, soundCRUD.callOperation('delete', req.params));
};

export const getFile = (req, res) => {
  soundCRUD.callOperation('select', req.params).then((sound) => {
    res.sendFile(sound[0].filename, { root: soundsPath });
  });
};
