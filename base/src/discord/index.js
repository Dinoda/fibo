import 'dotenv/config';

import Client, { Command, killProcessOnSignal, FiboDiscordError } from 'fibo-discord';
import { joinVoiceChannel } from '@discordjs/voice';

import joinCommand from './commands/Join.js';
import randomCommand from './commands/Random.js';

import voiceStateCheck from './service/voiceStateCheck.js';


killProcessOnSignal();
killProcessOnSignal('uncaughtException');

const cl = new Client(process.env.DISCORD_TOKEN, process.env.DISCORD_CLIENT_ID);

cl.callCommand = async (cmd, interaction) => {
  try {
    await cmd.execute(cl, interaction);
  } catch (err) {
    if (err instanceof FiboDiscordError) {
      await interaction.reply(`Mooordu ! Mooordu ! Mooordu !\n\n*${err.message}*`);
    } else {
      throw err;
    }
  }
};

cl.on('VoiceStateUpdate', voiceStateCheck.bind(null, cl));

cl.addCommand(joinCommand);
cl.addCommand(randomCommand);

cl.start();
