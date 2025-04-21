import { Command } from 'fibo-discord';

import { random } from '../service/random.js';
import audioResources from '../service/audio.js';
import play from '../service/play.js';
import proximity from '../service/proximity.js';

const randomCommand = async (client, interaction) => {
  const search = interaction.options.getString('search');

  let audio = search ? proximity(search, audioResources) : random(audioResources);

  console.log(audio);
  await play(interaction, audio);
};

const cmd = new Command('random', 'Launch a random quote', 'r', randomCommand);

cmd.addStringOption('search', 'Une chaine de sélection');

export default cmd;
