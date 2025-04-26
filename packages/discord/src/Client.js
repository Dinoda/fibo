import { Client as DiscordClient, GatewayIntentBits as Intents, Events, REST, Routes } from 'discord.js';

import Command from './Command.js';

const STATUS_CREATED = 1;
const STATUS_STARTING = 2;
const STATUS_RUNNING = 3;
const STATUS_DESTROYED = 4;

const defaultIntents = ['Guilds', 'GuildVoiceStates'];

export default class Client {

  static clients = [];

  constructor(token, clientId, intents = defaultIntents) {
    this.token = token;
    this.clientId = clientId;

    this.intents = intents;
    this.commands = [];

    this.resolveIntents();

    this.client = new DiscordClient({ intents: this.intents });

    this.on('InteractionCreate', (interaction) => {
      this.interaction(interaction);
    });

    this.on(Events.ClientReady, cl => {
      console.log(`Client running "${cl.user.tag}"`);
      this.status = STATUS_RUNNING;
    });

    this.status = STATUS_CREATED;
    Client.clients.push(this);
  }

  // Standard Accessors //
  // ================== //
  
  getChannel(id) {
    console.log(this.client.channels);
    return this.client.channels.fetch(id);
  }

  // INITIALISATION METHODS //
  // ====================== //
  
  resolveIntents() {
    for (let i = 0;i < this.intents.length;i++) {
      this.intents[i] = Intents[this.intents[i]] ?? this.intents[i];
    }
  }

  on(event, callback) {
    event = Events[event] ?? event;

    this.client.on(event, callback);
  }

  addCommand(command) {
    if (this.status != STATUS_CREATED) {
      throw new Error(`Can't add command after the client is started. Create a new client instead`);
    }

    if (!(command instanceof Command)) {
      throw new Error(`Parameter of "addCommand" method should be an instance of class "Command"`);
    }

    this.commands.push(command);
  }

  // LIFECYCLE METHODS //
  // ================= //

  async start() {
    if (this.status == STATUS_CREATED) {
      this.status = STATUS_STARTING;

      await this.updateRESTCommands();

      this.client.login(this.token).then(() => {
        this.status = STATUS_RUNNING;
      });
    }
  }

  async updateRESTCommands() {
    const rest = new REST({ version: '10' }).setToken(this.token);

    console.log(`Starting command pushing...`);

    const body = this.commands.reduce((list, cmd) => {
      return [
        ...list,
        ...cmd.restCall(),
      ];

    }, []);

    await rest.put(Routes.applicationCommands(this.clientId), {
      body
    });

    console.log(`Pushed all commands to Discord`);
  }

  async destroy() {
    if (this.status != STATUS_DESTROYED) {
      await this.client.destroy().then(() => {
        this.status = STATUS_DESTROYED;
      });
    }
  }

  // LISTENER METHODS //
  // ================ //

  async interaction(interaction) {
    if (interaction.isChatInputCommand()) {
      const cmd = this.getCommand(interaction);

      console.log(`Command executed "${cmd.name}"`);

      await this.callCommand(cmd, interaction);

      if (interaction && ! interaction.replied) {
        await interaction.reply("Command executed without reply");
      }
    }
  }

  async callCommand(cmd, interaction) {
    await cmd.execute(this, interaction);
  }

  getCommand(interaction) {
    const name = interaction.commandName;
    for (const cmd of this.commands) {
      if (cmd.is(name)) {
        return cmd;
      }
    }
  }
}

