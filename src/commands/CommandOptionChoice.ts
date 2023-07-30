import { Choice } from "./Choice";

export class CommandOptionChoice {
    
    private _name: string;

    private _description: string;
    private _required: boolean;
    private _type: number;
    private _choices: Array<Choice>;

    constructor(name : string, description : string, required : boolean, type : number, choices : Array<Choice>) {
        this._name = name;
        this._description = description;
        this._required = required;
        this._type = type;
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

    public get type(): number {
        return this._type;
    }

    public set type(value: number) {
        this._type = value;
    }

    public get choices(): Array<Choice> {
        return this._choices;
    }

    public set choices(value: Array<Choice>) {
        this._choices = value;
    }

}