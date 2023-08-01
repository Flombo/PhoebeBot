import { AttachmentBuilder, EmbedBuilder } from "discord.js";
import { IReference } from "../referenceRetrieval/IReference";
import { IMessageBuilder } from "./IMessageBuilder";

export abstract class MessageBuilder implements IMessageBuilder {
    
    buildReferenceMessage(reference: IReference): EmbedBuilder {
        throw new Error("Method not implemented. Retrieved reference: " + reference);
    }
    
    public buildImageAttachment(buffer: Buffer): AttachmentBuilder {
        const attachementBuilder : AttachmentBuilder = new AttachmentBuilder(buffer);
        return attachementBuilder;
    }
    
}