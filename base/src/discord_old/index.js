import 'dotenv/config';

import Client, { Command, killProcessOnSignal } from 'fibo-discord';

import { joinVoiceChannel } from '@discordjs/voice';

killProcessOnSignal();

const cl = new Client(process.env.DISCORD_TOKEN, process.env.DISCORD_CLIENT_ID);

cl.addCommand(new Command('join', 'Invite the kaamelodiau to join your voice chat', 'j', (client, interaction) => {
  const member = interaction.member;

  if (member && member.channel) {
    joinVoiceChannel({
      channelId: member.channel.id,
      guildId: member.guild.id,
      adapterCreator: member.guild.voiceAdapterCreator,
    });
  }
}));

cl.start();
/*
import Kaamelodiau from './Kaamelodiau.js';

const bot = new Kaamelodiau();

process.on('SIGINT', (sign) => {
  console.log('Received SIGINT... Closing bot...');
  bot.destroy().then(() => {
    console.log('Bot closed. Terminating process...');
    process.exit(0);
  });
});

await bot.resolveCommands();

await bot.listen();

/*

import REST from './REST.js';
import client from './client.js';

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;

try {
  await REST(TOKEN, CLIENT_ID);
} catch(err) {
  console.error(err);
  process.exit(-1);
}

const cl = client();

process.on('SIGINT', (sign) => {
  console.log(sign);
  console.log('Closing client...');
  cl.destroy().then(() => {
    console.log('Client closed. Terminating...');
    process.exit(0);
  });
});

cl.login(TOKEN);

*/
