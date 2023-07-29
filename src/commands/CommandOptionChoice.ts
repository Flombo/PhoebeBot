import { APIApplicationCommandOptionChoice } from "discord.js";

export class CommandOptionChoice {
    
    private _name: string;

    private _description: string;

    private _required: boolean;
    private _choices: Array<APIApplicationCommandOptionChoice<string>>;

    constructor(name : string, description : string, required : boolean, choices : Array<APIApplicationCommandOptionChoice<string>>) {
        this._name = name;
        this._description = description;
        this._required = required;
        this._choices = choices;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get description(): string {
        return this._description;
    }

    public set description(value: string) {
        this._description = value;
    }

    public get required(): boolean {
        return this._required;
    }

    public set required(value: boolean) {
        this._required = value;
    }

    public get choices(): Array<APIApplicationCommandOptionChoice<string>> {
        return this._choices;
    }

    public set choices(value: Array<APIApplicationCommandOptionChoice<string>>) {
        this._choices = value;
    }

}