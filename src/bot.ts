import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from "dotenv";
import { CommandBuilder } from './CommandBuilder';
import { CommandRegistry } from './CommandRegistry';
import { ButtonEventHandler } from './handler/ButtonEventHandler';
import { CommandEventHandler } from './handler/CommandEventHandler';
import { IDiscordEventHandler } from './handler/IDiscordEventHandler';

config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commandBuilder: CommandBuilder = new CommandBuilder();
let commandEventHandler: IDiscordEventHandler;
let buttonEventHandler: IDiscordEventHandler;

client.once(Events.ClientReady, event => {
	console.log(`Ready! Logged in as ${event.user.tag}`);
	commandBuilder.buildCommands();
	CommandRegistry.registerCommands(commandBuilder.commands, process.env.CLIENT_ID, process.env.BOTTOKEN);
	commandEventHandler = new CommandEventHandler(commandBuilder.commands);
	buttonEventHandler = new ButtonEventHandler();
});

client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isChatInputCommand()) {
		await commandEventHandler.handle(interaction);
	} else if (interaction.isButton()) {
		await buttonEventHandler.handle(interaction);
	}
});

client.login(process.env.BOTTOKEN).then(() => console.log('Bot logged in!'));