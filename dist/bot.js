"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = require("dotenv");
const CommandBuilder_1 = require("./CommandBuilder");
const CommandRegistry_1 = require("./CommandRegistry");
(0, dotenv_1.config)();
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
let commandBuilder = new CommandBuilder_1.CommandBuilder();
client.once(discord_js_1.Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
    commandBuilder.buildCommands();
    CommandRegistry_1.CommandRegistry.registerCommands(commandBuilder.commands, process.env.CLIENT_ID, process.env.BOTTOKEN);
});
client.on(discord_js_1.Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    const availableCommands = commandBuilder.commands;
    const hasCommand = availableCommands.has(interaction.commandName);
    if (!hasCommand) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }
    const command = availableCommands.get(interaction.commandName);
    try {
        if (command !== undefined) {
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
});
client.login(process.env.BOTTOKEN).then(() => console.log('Bot logged in!'));
//# sourceMappingURL=bot.js.map