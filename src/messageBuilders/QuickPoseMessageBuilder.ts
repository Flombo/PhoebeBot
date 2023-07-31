import { EmbedBuilder } from "discord.js";
import { IReference } from "../referenceRetrieval/IReference";
import { IMessageBuilder } from "./IMessageBuilder";

export class QuickPoseMessageBuilder implements IMessageBuilder {
    
    buildReferenceMessage(reference: IReference): EmbedBuilder {
        const embedBuilder : EmbedBuilder = new EmbedBuilder();
        embedBuilder.setColor(0x0099FF)
            .setTitle('Reference pose')
            .setDescription("Reference retrieved from Quickposes. All rights reserve to them.")
            .addFields(
                {name: 'Reference image', value: reference.url},
                {name: 'Reference source', value: reference.url},
                {name: 'Owner', value: reference.owner}
            )
            .setImage(reference.url)
            .setFooter({text : "Copyright:", iconURL : "https://quickposes.com/apple-touch-icon.png"})
            .setTimestamp();

        return embedBuilder;
    }
    
}