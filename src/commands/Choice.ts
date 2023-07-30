export class Choice {
    private _name: string;
    private _value: string;

    constructor(name : string, value : string) {
        this._name = name;
        this._value = value;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get value(): string {
        return this._value;
    }

    public set value(value: string) {
        this._value = value;
    }
}