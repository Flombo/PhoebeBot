import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { CommandOptionChoice } from "./CommandOptionChoice";
import { IChoice } from "./IChoice";

export interface ICommand {

    execute(interaction: ChatInputCommandInteraction): Promise<void>;

    initSlashCommand(): void;

    get options(): Array<CommandOptionChoice>;

    set options(value: Array<CommandOptionChoice>);

    get description(): string;

    set description(value: string);

    get name(): string;

    set name(value: string);

    get data(): SlashCommandBuilder;

    getSelectedChoices(): Array<IChoice>;

}