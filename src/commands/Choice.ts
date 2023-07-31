export class Choice {
    private _name: string;
    private _value: string;
    private _selected : boolean;

    constructor(name : string, value : string) {
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

    public get value(): string {
        return this._value;
    }

    public set value(value: string) {
        this._value = value;
    }
    
    public get selected(): boolean {
        return this._selected;
    }

    public set selected(value: boolean) {
        this._selected = value;
    }

}