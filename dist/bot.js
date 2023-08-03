"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = require("dotenv");
const CommandBuilder_1 = require("./CommandBuilder");
const CommandRegistry_1 = require("./CommandRegistry");
const DefaultCommand_1 = require("./commands/poseCommands/DefaultCommand");
const ReferenceButtonIds_1 = require("./messageBuilders/referenceButtons/ReferenceButtonIds");
const QuickPoseReference_1 = require("./referenceRetrieval/QuickPoseReference");
(0, dotenv_1.config)();
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
let commandBuilder = new CommandBuilder_1.CommandBuilder();
client.once(discord_js_1.Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
    commandBuilder.buildCommands();
    CommandRegistry_1.CommandRegistry.registerCommands(commandBuilder.commands, process.env.CLIENT_ID, process.env.BOTTOKEN);
});
client.on(discord_js_1.Events.InteractionCreate, async (interaction) => {
    if (interaction.isChatInputCommand()) {
        await interaction.deferReply({ ephemeral: true });
        const availableCommands = commandBuilder.commands;
        const hasCommand = availableCommands.has(interaction.commandName);
        if (!hasCommand) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
        const command = availableCommands.get(interaction.commandName);
        try {
            if (command !== undefined) {
                selectChoosenChoice(interaction, command);
                await command.execute(interaction);
            }
        }
        catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            }
            else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
    else if (interaction.isButton()) {
        await interaction.deferReply({ ephemeral: true });
        const embeds = interaction.message.embeds;
        if (embeds.length == 0) {
            await interaction.reply({ content: 'There was an error while executing this interaction!', ephemeral: true });
        }
        const embed = embeds[0];
        const reference = new QuickPoseReference_1.QuickPoseReference();
        reference.url = embed.fields[0].value;
        reference.owner = embed.fields[2].value;
        reference.height = +embed.fields[3].value;
        reference.width = +embed.fields[4].value;
        const attachements = interaction.message.attachments;
        if (attachements.size > 0) {
            if (attachements.first() !== undefined) {
                const attachementURL = attachements.first()?.proxyURL;
                reference.url = attachementURL !== undefined ? attachementURL : reference.url;
            }
        }
        const defaultCommand = new DefaultCommand_1.DefaultCommand();
        switch (interaction.customId) {
            case ReferenceButtonIds_1.ReferenceButtonIds[ReferenceButtonIds_1.ReferenceButtonIds.mirrorHorizontalEvent]:
                await defaultCommand.mirrorHorizontal(reference, interaction);
                break;
            case ReferenceButtonIds_1.ReferenceButtonIds[ReferenceButtonIds_1.ReferenceButtonIds.mirrorVerticalEvent]:
                await defaultCommand.mirrorVertical(reference, interaction);
                break;
            case ReferenceButtonIds_1.ReferenceButtonIds[ReferenceButtonIds_1.ReferenceButtonIds.rotateClockwiseEvent]:
                await defaultCommand.rotateClockwise(reference, interaction);
                break;
            case ReferenceButtonIds_1.ReferenceButtonIds[ReferenceButtonIds_1.ReferenceButtonIds.rotateCounterClockwiseEvent]:
                await defaultCommand.rotateCounterClockwise(reference, interaction);
                break;
        }
    }
});
function selectChoosenChoice(interaction, command) {
    const choosenOptions = interaction.options.data;
    command.options.forEach(option => {
        choosenOptions.forEach(choosenOption => {
            option.choices.forEach(choice => {
                if (choice.value === choosenOption.value) {
                    choice.selected = true;
                }
            });
        });
    });
}
client.login(process.env.BOTTOKEN).then(() => console.log('Bot logged in!'));
//# sourceMappingURL=bot.js.map