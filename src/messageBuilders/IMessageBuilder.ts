import { ActionRowBuilder, AttachmentBuilder, EmbedBuilder, MessageActionRowComponentBuilder } from "discord.js";
import { IReference } from "../referenceRetrieval/IReference";

export interface IMessageBuilder {

    buildReferenceMessage(reference: IReference): EmbedBuilder;

    buildImageAttachment(buffer: Buffer): AttachmentBuilder;

    buildReferenceButtons(): Array<ActionRowBuilder<MessageActionRowComponentBuilder>>;

}