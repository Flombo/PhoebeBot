import { IChoice } from "./IChoice";

export class NumberChoice implements IChoice {
    private _name: string;
    private _value: number;
    private _selected: boolean;

    constructor(name: string, value: number) {
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

    public get value(): number {
        return this._value;
    }

    public set value(value: number) {
        this._value = value;
    }

    public get selected(): boolean {
        return this._selected;
    }

    public set selected(value: boolean) {
        this._selected = value;
    }
}