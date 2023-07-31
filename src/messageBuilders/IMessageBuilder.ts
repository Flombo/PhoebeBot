import { EmbedBuilder } from "discord.js";
import { IReference } from "../referenceRetrieval/IReference";

export interface IMessageBuilder {

    buildReferenceMessage(reference : IReference) : EmbedBuilder

}