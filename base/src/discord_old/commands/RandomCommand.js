import Command from './BaseCommand.js';

export default class RandomCommand extends Command {
  constructor(kaamel) {
    super('random', 'Launch a random quote', 'r');

    this.kaamel = kaamel;

    this.addStringOption('search', 'An optional search string', {
      autocomplete: async (interaction) => {
        const focusedValue = interaction.options.getFocused();
        const choices = ['Kaamelott'];
        const filtered = choices.filtered(choice => choice.startWith(focusedValue));

        await interaction.respond(
          filtered.map(choice => ({ name: choice, value: choice }))
        );
      },
    });
  }

  async execute(interaction) {
    console.log(interaction.options);
  }
}

/*
export default {
  data: new SlashCommandBuilder()
    .setName('random')
    .setDescription('Launch a random quote')
    .addStringOption(option => 
      option.setName('search')
        .setDescription('An optional search string')
      ),
  execute: async (interaction) => {
  },
};
*/
