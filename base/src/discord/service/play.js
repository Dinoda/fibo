import { FiboDiscordError } from 'fibo-discord';

import { createAudioResource } from '@discordjs/voice';

import { getAudioPlayer } from '../voiceConnections.js';

export default async (interaction, resource) => {
  const member = interaction.member;

  if (member.voice?.channel) {
    const channel = member.voice.channel;

    const ap = getAudioPlayer(channel.id);

    if (ap) {
      ap.play(createAudioResource(resource.file));
      await interaction.reply(resource.name);
    } else {
      throw new FiboDiscordError("You can't call for it out of a channel with Kaamelodiau, make it join you first");
    }
  }
};
