import { joinVoiceChannel, createAudioPlayer, NoSubscriberBehavior, createAudioResource } from '@discordjs/voice';

import randomChoice from './random.js';
import loadResources from './audioResources.js';

const resources = await loadResources();

const connections = {};
const players = {};

const kaamelodiau = {
  join: (member) => {
    if (! member || !member.voice || !member.voice.channel) {
      return false;
    }

    const channel = member.voice.channel;
    const guild = channel.guild;

    const conn = joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
    });

    const player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
      }
    });

    conn.subscribe(player);

    connections[channel.id] = conn;
    players[channel.id] = player;

    return true;
  },
  random: (interaction, member) => {
    const voice = member.voice;

    if (!voice) {
      interaction.reply('');
      return false;
    }

    const choice = randomChoice(resources);

    const channel = voice.channel;

    return kaamelodiau.play(interaction, member, choice);
  },
  play: (interaction, member, resource) => {
    const channel = member.voice.channel;

    try {
      players[channel.id].play(createAudioResource(resource.file));

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

      connections[channel.id].destroy();
      connections[channel.id] = undefined;

      players[channel.id].stop();
      players[channel.id] = undefined;
    }

    return true;
  },
  checkAudioChannel: (oldVoiceState, newVoiceState, client) => {
    // This user was in a voice channel
    const cid = oldVoiceState.channelId;
    if (cid) {
      // Get the connections linked to this channel if it exists
      const conn = connections[cid];

      if (conn) {
        const channel = client.channels.cache.get(cid);

        // Check if the bot is the last remaining
        if (channel.members.size == 1) {
          conn.destroy();
        }
      }
    }
  },
};

export default kaamelodiau;

