import { joinVoiceChannel, createAudioPlayer, NoSubscriberBehavior, createAudioResource } from '@discordjs/voice';

import randomChoice from './random.js';
import loadResources from './audioResources.js';

const resources = await loadResources();

const connections = {};
const players = {};

const kaamelodiau = {
  join: (member) => {
    const voice = member.voice;
    const channel = voice.channel;
    const guild = channel.guild;

    if (! connections[guild.id]) {
      connections[guild.id] = {};
      players[guild.id] = {};
    }

    const conn = joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    const player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
      }
    });

    conn.subscribe(player);

    connections[guild.id][channel.id] = conn;
    players[guild.id][channel.id] = player;

    return true;
  },
  random: (interaction, member) => {
    const voice = member.voice;

    if (!voice) {
      interaction.reply('');
      return false;
    }

    const choice = randomChoice(resources);

    const channel = voice.channel

    return kaamelodiau.play(interaction, member, choice);
  },
  play: (interaction, member, resource) => {
    const channel = member.voice.channel;
    const guild = channel.guild;

    try {
      players[guild.id][channel.id].play(createAudioResource(resource.file));

      interaction.reply(resource.name);
    } catch (err) {
      console.error(err);
      return false;
    }

    return true;
  },
  leave: (member) => {
    const voice = member.voice;

    if (voice) {
      const channel = voice.channel;
      const guild = channel.guild;

      connections[guild.id][channel.id].destroy();
      connections[guild.id][channel.id] = undefined;

      players[guild.id][channel.id].stop();
      players[guild.id][channel.id] = undefined;
    }

    return true;
  },
};

export default kaamelodiau;

