"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandEventHandler = void 0;
class CommandEventHandler {
    commands;
    constructor(commands) {
        this.commands = commands;
    }
    async handle(interaction) {
        await interaction.deferReply({ ephemeral: false });
        const availableCommands = this.commands;
        const hasCommand = availableCommands.has(interaction.commandName);
        if (!hasCommand) {
            interaction.followUp({ content: `No command matching ${interaction.commandName} was found.` });
            return;
        }
        const command = availableCommands.get(interaction.commandName);
        try {
            if (command !== undefined) {
                this.selectChoosenChoice(interaction, command);
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
    selectChoosenChoice(interaction, command) {
        const choosenOptions = interaction.options.data;
        command.options.forEach(option => {
            choosenOptions.forEach(choosenOption => {
                if (option.name === choosenOption.name) {
                    option.value = choosenOption.value;
                }
            });
        });
    }
}
exports.CommandEventHandler = CommandEventHandler;
