import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { Choice } from "./Choice";
import { CommandOptionChoice } from "./CommandOptionChoice";
import { ICommand } from "./ICommand";

export abstract class SlashCommand implements ICommand {

    private _data: SlashCommandBuilder;

    private _name: string;

    private _description: string;

    private _options: Array<CommandOptionChoice>;

    constructor(name: string, description: string, options: Array<CommandOptionChoice>) {
        this._name = name;
        this._description = description;
        this._options = options;
        this._data = new SlashCommandBuilder();
    }

    execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
        throw new Error("Method not implemented. With interaction:" + interaction);
    }

    /**
     * Adds data to the SlashCommandBuilder like description, options and name.
     */
    public initSlashCommand(): void {
        this._data.setName(this.name)
            .setDescription(this.description);

        this.options.forEach(option => {

            let stringOption = new SlashCommandStringOption();
            stringOption.setRequired(option.required);
            stringOption.setName(option.name);
            stringOption.setDescription(option.description);
            option.choices.forEach(choiceOption => {
                stringOption.addChoices(choiceOption)
            });

            this._data.addStringOption(stringOption);
        });
    }

    public get data(): SlashCommandBuilder {
        return this._data;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get description(): string {
        return this._description;
    }

    public set description(description: string) {
        this._description = description;
    }

    public get options(): Array<CommandOptionChoice> {
        return this._options;
    }

    public set options(value: Array<CommandOptionChoice>) {
        this._options = value;
    }

    getSelectedChoices(): Array<Choice> {
        let selectedChoices: Array<Choice> = new Array();
        this.options.forEach((option: CommandOptionChoice) => {
            selectedChoices.push(...(option.choices.filter((choice: Choice) => choice.selected)));
        });
        return selectedChoices;
    }

}