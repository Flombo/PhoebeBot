import { ButtonInteraction, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import { IReference } from "../referenceRetrieval/IReference";
import { Choice } from "./Choice";
import { CommandOptionChoice } from "./CommandOptionChoice";
import { PoseCommandType } from "./poseCommands/PoseCommandType";

export interface IReferenceCommand {

    initSlashCommand(): void;

    execute(interaction: ChatInputCommandInteraction): Promise<void>;

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

    get options(): Array<CommandOptionChoice>;

    set options(value: Array<CommandOptionChoice>);

    get type(): PoseCommandType;

    set type(value: PoseCommandType);

    get description(): string;

    set description(value: string);

    get name(): string;

    set name(value: string);

    get data(): SlashCommandBuilder;

    getSelectedChoices(): Array<Choice>;

}