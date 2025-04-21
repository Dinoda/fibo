import { Client as DiscordClient, Events, GatewayIntentBits } from 'discord.js';

const intents = [
  "Guilds",
  "GuildVoiceStates"
];

export default class Client {
  constructor() {
    this.client = new DiscordClient({
      intents: intents.map(i => GatewayIntentBits[i]),
    });

    this.client.on(Events.ClientReady, cl => {
      console.log(`Logged in as ${cl.user.tag}!`);
    });

    //this.client.on(Events.InteractionCreate, this.interact);

    //this.client.on(Events.VoiceStateUpdate, this.voiceState);
  }

  login(token) {
    this.client.login(token);
  }

  on(event, callback) {
    this.client.on(Events[event], callback);
  }

  async destroy() {
    await this.client.destroy();
  }
}
