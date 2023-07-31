// Require the necessary discord.js classes
import { ChatInputCommandInteraction, Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from "dotenv";
import { CommandBuilder } from './CommandBuilder';
import { CommandRegistry } from './CommandRegistry';
import { ICommand } from './commands/ICommand';

config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
let commandBuilder : CommandBuilder = new CommandBuilder();

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	commandBuilder.buildCommands();
	CommandRegistry.registerCommands(commandBuilder.commands, process.env.CLIENT_ID, process.env.BOTTOKEN);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const availableCommands : Map<string, ICommand> = commandBuilder.commands;
	const hasCommand : boolean = availableCommands.has(interaction.commandName);
	
	if (!hasCommand) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	const command : ICommand | undefined = availableCommands.get(interaction.commandName);

	try {
		if(command !== undefined) {
			selectChoosenChoice(interaction, command);
			await command.execute(interaction);
		}
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

function selectChoosenChoice(interaction : ChatInputCommandInteraction, command : ICommand) : void {
	const choosenOptions = interaction.options.data;
	command.options.forEach(option => {
		choosenOptions.forEach(choosenOption => {
			option.choices.forEach(choice => {
				if(choice.value === choosenOption.value) {
					choice.selected = true;
				}
			})
		});
	});
}

// Log in to Discord with your client's token
client.login(process.env.BOTTOKEN).then(() => console.log('Bot logged in!'));