import { ChatInputCommandInteraction } from "discord.js";
import { IReferenceCommand } from "../commands/IReferenceCommand";
import { IDiscordEventHandler } from "./IDiscordEventHandler";

export class CommandEventHandler implements IDiscordEventHandler {

    private commands: Map<string, IReferenceCommand>;

    constructor(commands: Map<string, IReferenceCommand>) {
        this.commands = commands;
    }

    public async handle(interaction: ChatInputCommandInteraction): Promise<void> {
        await interaction.deferReply({ ephemeral: false });
        const availableCommands: Map<string, IReferenceCommand> = this.commands;
        const hasCommand: boolean = availableCommands.has(interaction.commandName);

        if (!hasCommand) {
            interaction.followUp({ content: `No command matching ${interaction.commandName} was found.` });
            return;
        }

        const command: IReferenceCommand | undefined = availableCommands.get(interaction.commandName);

        try {
            if (command !== undefined) {
                this.selectChoosenChoice(interaction, command);
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
    }

    private selectChoosenChoice(interaction: ChatInputCommandInteraction, command: IReferenceCommand): void {
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

}