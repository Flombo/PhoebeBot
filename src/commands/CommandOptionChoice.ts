import { IChoice } from "./IChoice";

export class CommandOptionChoice {

    private _name: string;
    private _value: string | boolean | number | undefined;
    private _description: string;
    private _required: boolean;
    private _type: number;
    private _choices: Array<IChoice>;
    private _min: number;
    private _max: number;

    constructor(name: string, value: string | boolean | number | undefined = '', description: string, required: boolean, type: number, choices: Array<IChoice>, min: number = 0, max: number = 0) {
        this._name = name;
        this._value = value;
        this._description = description;
        this._required = required;
        this._type = type;
        this._choices = choices;
        this._min = min;
        this._max = max;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get value(): string | boolean | number | undefined {
        return this._value;
    }

    public set value(value: string | boolean | number | undefined) {
        this._value = value;
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

    public get choices(): Array<IChoice> {
        return this._choices;
    }

    public set choices(value: Array<IChoice>) {
        this._choices = value;
    }

    public get min(): number {
        return this._min;
    }

    public set min(value: number) {
        this._min = value;
    }

    public get max(): number {
        return this._max;
    }

    public set max(value: number) {
        this._max = value;
    }

}