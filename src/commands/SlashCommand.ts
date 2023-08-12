import { CacheType, ChatInputCommandInteraction, SlashCommandBooleanOption, SlashCommandBuilder, SlashCommandIntegerOption, SlashCommandStringOption } from "discord.js";
import { CommandOptionChoice } from "./CommandOptionChoice";
import { IChoice } from "./IChoice";
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

            const type: number = option.type;
            let slashCommandOption: any;

            switch (type) {
                case 3:
                    slashCommandOption = new SlashCommandStringOption();
                    slashCommandOption.setRequired(option.required);
                    slashCommandOption.setName(option.name);
                    slashCommandOption.setDescription(option.description);

                    if (option.choices !== undefined) {
                        option.choices.forEach((choiceOption: IChoice) => {
                            slashCommandOption.addChoices(choiceOption)
                        });
                    }
                    this._data.addStringOption(slashCommandOption);
                    break;
                case 5:
                    slashCommandOption = new SlashCommandBooleanOption();
                    slashCommandOption.setRequired(option.required);
                    slashCommandOption.setName(option.name);
                    slashCommandOption.setDescription(option.description);
                    this._data.addBooleanOption(slashCommandOption);
                    break;
                case 4:
                    slashCommandOption = new SlashCommandIntegerOption();
                    slashCommandOption.setRequired(option.required);
                    slashCommandOption.setName(option.name);
                    slashCommandOption.setDescription(option.description);
                    slashCommandOption.setMinValue(option.min);
                    slashCommandOption.setMaxValue(option.max);
                    this._data.addIntegerOption(slashCommandOption);
                    break;
            }
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

    getSelectedChoices(): Array<IChoice> {
        let selectedChoices: Array<IChoice> = new Array();
        this.options.forEach((option: CommandOptionChoice) => {
            selectedChoices.push(...(option.choices.filter((choice: IChoice) => choice.selected)));
        });
        return selectedChoices;
    }

}