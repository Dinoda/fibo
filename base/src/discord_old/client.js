import { Client, Events, GatewayIntentBits } from 'discord.js';
import kaamelodiau from './kaamelodiau.js';

import randomChoice from './random.js';

const fail = (command) => {
  throw new Error(`Failure on command "${command}"`);
};

const mocking = [
  'Ah bah c\'est pas une flèche',
];

export default () => {
  const client = new Client({ 
    intents: [
      GatewayIntentBits.Guilds, 
      GatewayIntentBits.GuildVoiceStates,
    ]
  });

  client.on(Events.ClientReady, cl => {
    console.log(`Logged in as ${cl.user.tag}!`);
  });

  client.on(Events.InteractionCreate, async interaction => {
    //console.log('Interaction:', interaction);

    try {
      const member = interaction.member;

      if (!interaction.isChatInputCommand()) {
        return;
      }

      if (!member || !member.voice) {
        await interaction.reply('Et tu veux que je fasse ça où malin ?!');
        return;
      }

      switch(interaction.commandName) {
        case 'ping': 
          console.log('Pong!');
          await interaction.reply('Pong!');
          break;
        case 'j':
        case 'join':
          if (kaamelodiau.join(member)) {
            await interaction.reply(randomChoice([
              "Maintenant il faut m'écouter. Parce que là j'en ai gros.",
            ]));
          } else {
            await interaction.reply(randomChoice(mocking));
          }
          break;
        case 'l':
        case 'leave':
          if (kaamelodiau.leave(member)) {
            await interaction.reply(randomChoice([
              "C'est honteux !",
              "M'ADRESSER PAS LA PAROLE ! HERETIQUE ! DEMON !",
            ]));
          } else {
            await interaction.reply(randomChoice(mocking));
          }
          break;
        case 'r':
        case 'random':
          await kaamelodiau.random(interaction, member);
          break;
      }
    } catch (err) {
      console.log(err);
      client.destroy().then(() => {
        process.exit(0);
      });
    }
  });

  client.on(Events.VoiceStateUpdate, (oldState, newState) => {
    kaamelodiau.checkAudioChannel(oldState, newState, client);
  });

  return client;
};
