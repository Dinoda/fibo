import { SlashCommandBuilder } from 'discord.js';

export default class Command {
  constructor(name, description, short = null, execute = null) {
    if (typeof short == "function") {
      [short, execute] = [null, short];
    }

    this.name = name;
    this.description = description;
    this.short = short;

    this.autocomplete = {};
    this.cmd = this.build(name, description);

    if (short) {
      this.scmd = this.build(short, `Short version of command "${name}"`);
    }

    if (execute) {
      this.execute = execute;
    }
  }

  is(name) {
    return name ? name == this.name || name == this.short : false;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  build(name, description) {
    const bld = new SlashCommandBuilder();

    bld.setName(name).setDescription(description);

    return bld;
  }

  addStringOption(name, description, options = {}) {
    this.__addStringOption(this.cmd, name, description, options);

    if (this.scmd) 
      this.__addStringOption(this.scmd, name, description, options);
  }

  __addStringOption(cmd, name, description, options) {
    cmd.addStringOption(opt => {
      opt.setName(name)
        .setDescription(description)
        .setRequired(!!options.required)
      ;

      if (options.autocomplete) {
        opt.setAutocomplete(true);

        this.autocomplete[name] = options.autocomplete;
      }

      return opt;
    });
  }

  restCall() {
    if (this.scmd) 
      return [
        this.cmd.toJSON(),
        this.scmd.toJSON(),
      ];

    return [
      this.cmd.toJSON(),
    ];
  }

  async execute(client, interaction) {
    await interaction.reply('This looks like it was not implemented correctly by your dev... What a dick !');
  }
}
