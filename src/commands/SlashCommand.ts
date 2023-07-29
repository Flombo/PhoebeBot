import { Interaction, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { ICommand } from "./ICommand";
import { CommandOptionChoice } from "./CommandOptionChoice";
import { CommandType } from "./CommandType";

export abstract class SlashCommand implements ICommand {

    private _slashCommandBuilder: SlashCommandBuilder;

    private _name: string;

    private _type: CommandType;

    private _description: string;

    private _choices: Array<CommandOptionChoice>;
    
    constructor(name : string, description : string, choices : Array<CommandOptionChoice>) {
        this._name = name;
        this._description = description;
        this._choices = choices;
        this._slashCommandBuilder = new SlashCommandBuilder();
        this.initSlashCommand(name, description, choices);
    }

    private initSlashCommand(name : string, description : string, choices : Array<CommandOptionChoice>) : void {
        this._slashCommandBuilder.setName(name)
        .setDescription(description);
       
        choices.forEach(choice => {

            let stringOption = new SlashCommandStringOption();
            stringOption.setRequired(choice.required);
            stringOption.setName(choice.name);
            stringOption.setDescription(choice.description);
            choice.choices.forEach(choiceOption => stringOption.addChoices(choiceOption));

            this._slashCommandBuilder.addStringOption(stringOption);
        });
    }

    public async execute(interaction: Interaction): Promise<void> {
        throw new Error("Method not implemented.");
    }

    protected get slashCommandBuilder(): SlashCommandBuilder {
        return this._slashCommandBuilder;
    }

    protected set slashCommandBuilder(value: SlashCommandBuilder) {
        this._slashCommandBuilder = value;
    }

    protected get name(): string {
        return this._name;
    }

    protected set name(value: string) {
        this._name = value;
    }

    public get type(): CommandType {
        return this._type;
    }
    
    public set type(value: CommandType) {
        this._type = value;
    }

    protected get description(): string {
        return this._description;
    }

    protected set description(value: string) {
        this._description = value;
    }

    protected get choices(): Array<CommandOptionChoice> {
        return this._choices;
    }

    protected set choices(value: Array<CommandOptionChoice>) {
        this._choices = value;
    }

}