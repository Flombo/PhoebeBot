export interface IChoice {

    get name(): string;

    set name(value: string);

    get value(): any;

    set value(value: any);

    get selected(): boolean;

    set selected(value: boolean);

}