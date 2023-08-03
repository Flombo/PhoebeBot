// Require the necessary discord.js classes
import { Attachment, ChatInputCommandInteraction, Client, Collection, Embed, Events, GatewayIntentBits } from 'discord.js';
import { config } from "dotenv";
import { CommandBuilder } from './CommandBuilder';
import { CommandRegistry } from './CommandRegistry';
import { IReferenceCommand } from './commands/IReferenceCommand';
import { DefaultCommand } from './commands/poseCommands/DefaultCommand';
import { ReferenceButtonIds } from './messageBuilders/referenceButtons/ReferenceButtonIds';
import { IReference } from './referenceRetrieval/IReference';
import { QuickPoseReference } from './referenceRetrieval/QuickPoseReference';

config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
let commandBuilder: CommandBuilder = new CommandBuilder();

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	commandBuilder.buildCommands();
	CommandRegistry.registerCommands(commandBuilder.commands, process.env.CLIENT_ID, process.env.BOTTOKEN);
});

client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isChatInputCommand()) {
		await interaction.deferReply({ ephemeral: true });
		const availableCommands: Map<string, IReferenceCommand> = commandBuilder.commands;
		const hasCommand: boolean = availableCommands.has(interaction.commandName);

		if (!hasCommand) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		const command: IReferenceCommand | undefined = availableCommands.get(interaction.commandName);

		try {
			if (command !== undefined) {
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
	} else if (interaction.isButton()) {
		await interaction.deferReply({ ephemeral: true });

		const embeds: Array<Embed> = interaction.message.embeds;

		if (embeds.length == 0) {
			await interaction.reply({ content: 'There was an error while executing this interaction!', ephemeral: true });
		}
		const embed: Embed = embeds[0];
		//const attachments: Collection<string, Attachment> = interaction.message.attachments;

		const reference: IReference = new QuickPoseReference();
		reference.url = embed.fields[0].value;
		reference.owner = embed.fields[2].value;
		reference.height = +embed.fields[3].value;
		reference.width = +embed.fields[4].value;

		const attachements: Collection<string, Attachment> = interaction.message.attachments;

		if (attachements.size > 0) {
			if (attachements.first() !== undefined) {
				const attachementURL: string | undefined = attachements.first()?.proxyURL;
				reference.url = attachementURL !== undefined ? attachementURL : reference.url;
			}
		}


		const defaultCommand: DefaultCommand = new DefaultCommand();

		switch (interaction.customId) {
			case ReferenceButtonIds[ReferenceButtonIds.mirrorHorizontalEvent]:
				await defaultCommand.mirrorHorizontal(reference, interaction);
				break;
			case ReferenceButtonIds[ReferenceButtonIds.mirrorVerticalEvent]:
				await defaultCommand.mirrorVertical(reference, interaction);
				break;
			case ReferenceButtonIds[ReferenceButtonIds.rotateClockwiseEvent]:
				await defaultCommand.rotateClockwise(reference, interaction);
				break;
			case ReferenceButtonIds[ReferenceButtonIds.rotateCounterClockwiseEvent]:
				await defaultCommand.rotateCounterClockwise(reference, interaction);
				break;
		}
	}
});

function selectChoosenChoice(interaction: ChatInputCommandInteraction, command: IReferenceCommand): void {
	const choosenOptions = interaction.options.data;
	command.options.forEach(option => {
		choosenOptions.forEach(choosenOption => {
			option.choices.forEach(choice => {
				if (choice.value === choosenOption.value) {
					choice.selected = true;
				}
			})
		});
	});
}

// Log in to Discord with your client's token
client.login(process.env.BOTTOKEN).then(() => console.log('Bot logged in!'));