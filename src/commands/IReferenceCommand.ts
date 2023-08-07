import { ButtonInteraction } from "discord.js";
import { IReference } from "../referenceRetrieval/IReference";
import { ICommand } from "./ICommand";

export interface IReferenceCommand extends ICommand {

    mirrorHorizontal(reference: IReference, interaction: ButtonInteraction): Promise<void>;

    mirrorVertical(reference: IReference, interaction: ButtonInteraction): Promise<void>;

    rotateClockwise(reference: IReference, interaction: ButtonInteraction): Promise<void>;

    rotateCounterClockwise(reference: IReference, interaction: ButtonInteraction): Promise<void>;

    sharpen(reference: IReference, interaction: ButtonInteraction): Promise<void>;

    blur(reference: IReference, interaction: ButtonInteraction): Promise<void>;

    greyscale(reference: IReference, interaction: ButtonInteraction): Promise<void>;

    negate(reference: IReference, interaction: ButtonInteraction): Promise<void>;

    normalize(reference: IReference, interaction: ButtonInteraction): Promise<void>;

    median(reference: IReference, interaction: ButtonInteraction): Promise<void>;

}