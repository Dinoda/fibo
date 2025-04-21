import { Command, FiboDiscordError } from 'fibo-discord';

import { joinVoiceChannel, createAudioPlayer } from '@discordjs/voice';

import { addVoiceConnection } from '../voiceConnections.js';

const joinCommand = async (client, interaction) => {
  const member = interaction.member;

  if (member && member.voice?.channel) {
    const channel = member.voice.channel;

    const vc = joinVoiceChannel({
      channelId: channel.id,
      guildId: member.guild.id,
      adapterCreator: member.guild.voiceAdapterCreator,
    });

    const ap = createAudioPlayer();

    vc.subscribe(ap);

    addVoiceConnection(channel.id, vc, ap);
  } else {
    throw new FiboDiscordError(`You can't call for Kaamelodiau to join you out of a voice channel`);
  }
};

export default new Command('join', 'Invite the Kaamelodiau to join your voice chat.', 'j', joinCommand);
