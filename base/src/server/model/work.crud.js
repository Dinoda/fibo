import CRUD from 'fibo-crud';

import Validator, { types as v } from 'fibo-validate';

import database from '../service/database.js';

import { SELECT_ALL, SELECT, SELECT_ALL_FULL, SELECT_FULL, INSERT, UPDATE, DELETE } from './work.sql.js';

const fullHydrator = (data) => {
  const works = {};

  for (const d of data) {
    if (! works[d.work_id]) {
      works[d.work_id] = {
        id: d.work_id,
        name: d.work_name,
        description: d.work_description,
        episodes: {},
      };
    }

    if (d.episode_id && ! works[d.work_id].episodes[d.episode_id]) {
      works[d.work_id].episodes[d.episode_id] = {
        id: d.episode_id,
        name: d.episode_name,
        description: d.episode_description,
        order: d.episode_order,
        work: d.work_id,
        sounds: {},
      };
    }

    if (d.sound_id) {
      works[d.work_id].episodes[d.episode_id].sounds[d.sound_id] = {
        id: d.sound_id,
        name: d.sound_name,
        description: d.sound_description,
        filename: d.sound_filename,
        episode: d.episode_id,
      };
    }
  }

  const result = Object.values(works);

  for (const w of result) {
    w.episodes = Object.values(w.episodes).sort((a,b) => {
      return a.order - b.order;
    });
    console.log(w.episodes);

    for (const e of w.episodes) {
      e.sounds = Object.values(e.sounds);
    }
  }

  return result;
};

const crud = new CRUD(database, {
  selectAll: {
    sql: SELECT_ALL,
    select: true,
  },
  select: {
    sql: SELECT,
    params: ['id'],
    select: true,
  },
  selectAllFull: {
    sql: SELECT_ALL_FULL,
    select: true,
    hydrator: "full",
  },
  selectFull: {
    sql: SELECT_FULL,
    params: ['id'],
    select: true,
    hydrator: "full",
  },
  insert: {
    sql: INSERT,
    params: ['name', 'description'],
    select: false,
  },
  update: {
    sql: UPDATE,
    params: ['name', 'description', 'id'],
    select: false,
  },
  delete: {
    sql: DELETE,
    params: ['id'],
    delete: true,
  },
}, {
    validators: {
      def: new Validator({
        id: 'integer',
        name: v.requiredAnd(v.string),
        description: 'string',
      }),
    },
    defaultValidator: 'def',
    hydrators: {
      full: fullHydrator,
    },
  });

export default crud;


