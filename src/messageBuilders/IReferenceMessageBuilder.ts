import { ActionRowBuilder, AttachmentBuilder, EmbedBuilder, MessageActionRowComponentBuilder } from "discord.js";
import { IReference } from "../referenceRetrieval/IReference";

export interface IReferenceMessageBuilder {

    buildReferenceMessage(reference: IReference): EmbedBuilder;

    buildTransformedReferenceMessage(reference: IReference, attachmentName: string): EmbedBuilder;

    buildTransformedReferenceAttachment(buffer: Buffer): AttachmentBuilder;

    buildReferenceButtons(): Array<ActionRowBuilder<MessageActionRowComponentBuilder>>;

}