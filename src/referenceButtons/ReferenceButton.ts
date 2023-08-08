import { ButtonStyle } from "discord.js";
import { IReferenceButton } from "./IReferenceButton";

export class ReferenceButton implements IReferenceButton {

    private _customId: string;
    private _label: string;
    private _style: ButtonStyle;

    constructor(customId: string = '', label: string = '', style: number = 1) {
        this._customId = customId;
        this._label = label;
        this._style = style;
    }

    public get customId(): string {
        return this._customId;
    }

    public set customId(value: string) {
        this._customId = value;
    }

    public get label(): string {
        return this._label;
    }

    public set label(value: string) {
        this._label = value;
    }

    public get style(): ButtonStyle {
        return this._style;
    }

    public set style(value: ButtonStyle) {
        this._style = value;
    }

}