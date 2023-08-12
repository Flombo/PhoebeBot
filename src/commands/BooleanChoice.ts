import { IChoice } from "./IChoice";

export class BooleanChoice implements IChoice {
    private _name: string;
    private _value: boolean;
    private _selected: boolean;

    constructor(name: string, value: boolean) {
        this._name = name;
        this._value = value;
        this._selected = false;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get value(): boolean {
        return this._value;
    }

    public set value(value: boolean) {
        this._value = value;
    }

    public get selected(): boolean {
        return this._selected;
    }

    public set selected(value: boolean) {
        this._selected = value;
    }
}