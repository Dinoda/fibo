import init from './init/init.js';
import getFiles from './init/files.js';
import getFileContent from './init/fileContent.js';

export default class Genesis {
  constructor(database, options) {
    this.db = database;
    this.options = options;

    this.reverse = options.reverse;
    this.path = options.prefix + (this.reverse ? options.reverseDir : '');
    this.files = options.files;

    this.targetStatus = this.reverse ? 'reversed' : 'loaded';
  }

  async init() {
    await init(this.db, this.options.genesisSQL);
  }

  async load() {
    await this.loadGenesis();
    await this.loadFiles();

    let reload = false;

    for (const f of this.files) {
      if (! this.genesis[f]) {
        reload = true;
        await this.addLine(f);
      }
    }

    if (reload) {
      await this.loadGenesis();
    }
  }

  async addLine(file) {
    await this.db.query('INSERT INTO `genesis` (`filename`) VALUES (?)', [file]);
  }

  async loadGenesis() {
    this.genesis = {};

    const res = await this.db.query('SELECT * FROM `genesis`');

    for (const row of res) {
      const fn = row.filename;

      this.genesis[fn] = row;
    }
  }

  async loadFiles() {
    if (! this.files) {
      this.files = this.options.files ?? await getFiles(this.path);
    }

    if (this.reverse) {
      this.files.reverse();
    }
  }

  display() {
    for (const file of this.files) {
      const st = this.genesis[file].status;
      const lu = this.genesis[file].last_update;
      console.log(`Status: ${st} -- ${file} - Last update: ${lu}`);
    }
  }

  async execute(filename, force = false) {
    if (this.genesis[filename]) {
      if (!force && this.genesis[filename].status == this.targetStatus) {
        throw new Error(`File ${filename} is already at the expected status: ${this.targetStatus}`, { cause: 'StatusMatching' });
      }

      await this.executeFile(filename);
    }
  }

  async executeFile(filename) {
    const sql = await getFileContent(this.path, filename);

    console.log(`Executing sql file "${filename}":`);
    console.log(sql);
    await this.db.query(sql, []);

    await this.updateGenesisTable(filename, this.targetStatus);
  }

  async updateGenesisTable(filename, status) {
    await this.db.query('UPDATE `genesis` SET status = ? WHERE filename = ?', [status, filename]);
  }
}

