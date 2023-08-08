import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from "dotenv";
import path from 'path';
import { CommandBuilder } from './CommandBuilder';
import { CommandRegistry } from './CommandRegistry';
import { ComponentFilesHelper } from './ComponentFilesHelper';
import { ButtonEventHandler } from './handler/ButtonEventHandler';
import { CommandEventHandler } from './handler/CommandEventHandler';
import { IDiscordEventHandler } from './handler/IDiscordEventHandler';

config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commandBuilder: CommandBuilder = new CommandBuilder();
let commandEventHandler: IDiscordEventHandler;
let buttonEventHandler: IDiscordEventHandler;
const componentFilesHelper: ComponentFilesHelper = new ComponentFilesHelper();

client.once(Events.ClientReady, event => {
	console.log(`Ready! Logged in as ${event.user.tag}`);
	componentFilesHelper.findJSONComponentFiles(path.join(__dirname, 'referenceButtons/referenceButtonJSON'));
	commandBuilder.buildCommands(componentFilesHelper.componentFiles);
	CommandRegistry.registerCommands(commandBuilder.commands, process.env.CLIENT_ID, process.env.BOTTOKEN);
	commandEventHandler = new CommandEventHandler(commandBuilder.commands);
	buttonEventHandler = new ButtonEventHandler(componentFilesHelper.componentFiles);
});

client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isChatInputCommand()) {
		await commandEventHandler.handle(interaction);
	} else if (interaction.isButton()) {
		await buttonEventHandler.handle(interaction);
	}
});

client.login(process.env.BOTTOKEN).then(() => console.log('Bot logged in!'));