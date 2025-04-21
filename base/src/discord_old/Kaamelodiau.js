import Client from './Client.js';
import commands from './commands/command.js';
import REST from './REST.js';

import { joinVoiceChannel, createAudioPlayer, NoSubscriberBehavior, createAudioResource } from '@discordjs/voice';

import resources from './kaamelodiau/resources.js';

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;

export default class Kaamelodiau {
  constructor() {
    this.commands = commands(this);
    this.client = new Client();

    this.tags = {};

    this.client.on('InteractionCreate', this.interact);
    this.client.on('VoiceStateUpdate', this.updateVoiceState);
  }

  async resolveCommands() {
    this.listeningCmds = {};
    this.restCmds = [];

    this.commands.forEach(c => {
      c.registerListening(this.listeningCmds);
      c.registerRest(this.restCmds);
    });
    
    await REST(this.restCmds, TOKEN, CLIENT_ID);
  }

  async listen() {
    this.client.login(TOKEN);
  }

  async interact(interaction) {
    const cmd = interaction.commmandName;

    if (cmd) {
      if (interaction.isAutocomplete()) {
        console.log('Autocomplete');
      }

      if (interaction.isChatInputCommand()) {
        console.log('Chat input command');
      }
    }
  }

  async updateVoiceState(interaction) {
  }

  async destroy() {
    await this.client.destroy();
  }
}
