import { EmbedBuilder } from "discord.js";
import { IReference } from "../referenceRetrieval/IReference";
import { IMessageBuilder } from "./IMessageBuilder";

export class GoogleReferenceMessageBuilder implements IMessageBuilder {
    
    buildReferenceMessage(reference: IReference): EmbedBuilder {
        throw new Error("Method not implemented.");
    }

}