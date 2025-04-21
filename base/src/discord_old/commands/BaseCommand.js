import { SlashCommandBuilder } from 'discord.js';

export default class Command {
  constructor(name, description, short = null) {
    this.name = name;
    this.description = description;
    this.short = short;

    this.autocomplete = {};

    this.command = new SlashCommandBuilder()
      .setName(name)
      .setDescription(description)
    ;

    this.commands = [this.command];

    if (short) {
      this.shortCommand = new SlashCommandBuilder()
        .setName(short)
        .setDescription(`Short for command "${name}"`);
      ;

      this.commands.push(this.shortCommand);
    }

  }

  addStringOption(name, description, options = {}) {
    this.commands.forEach(cmd => {
      cmd.addStringOption(opt => {
        opt.setName(name)
          .setDescription(description)
          .setRequired(!!options.required);

        if (options.autocomplete) {
          opt.setAutocomplete(true);

          this.autocomplete[name] = options.autocomplete;
        }

        return opt;
      });
    });
  }

  getAutocomplete(name) {
    return this.autocomplete[name];
  }

  registerListening(commandList) {
    commandList[this.name] = this;
    if (this.short) {
      commandList[this.short] = this;
    }
  }

  registerRest(commandList) {
    commandList.push(this.command.toJSON());
    if (this.shortCommand) {
      commandList.push(this.shortCommand.toJSON());
    }
  }
}
