import { ButtonStyle } from "discord.js";

export interface IReferenceButton {

    get customId(): string;

    set customId(value: string);

    get label(): string;

    set label(value: string);

    get style(): ButtonStyle;

    set style(value: ButtonStyle);

}