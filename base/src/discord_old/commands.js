import { SlashCommandBuilder } from 'discord.js';

import randomCommand from './commands/random.js';

const commands = {
  data: new SlashCommandBuilder()
    .setName('random')
    .setDescription('Launch a random quote')
    .addStringOption(option => 
      option.setName('search')
        .setDescription('An optional search string')
      ),
  execute: randomCommand,
};

export default [
  commands,
];

/*
export default [
  {
    name: "j",
    description: "Short for \"join\" command",
  },
  {
    name: "join",
    description: "Invit the Kaamelodiau to join your voice chat",
  },
  {
    name: "r",
    description: "Short for \"random\" command",
  },
  {
    name: "random",
    description: "Launch a random quote",
  },
  {
    name: "l",
    description: "Short for \"leave\" command",
  },
  {
    name: 'leave',
    description: 'Demand Kaamelodiau to leave the voice chat',
  },
];
*/
