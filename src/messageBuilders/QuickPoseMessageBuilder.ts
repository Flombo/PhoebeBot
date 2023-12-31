import { EmbedBuilder } from "discord.js";
import { IReference } from "../referenceRetrieval/IReference";
import { ReferenceMessageBuilder } from "./ReferenceMessageBuilder";

export class QuickPoseMessageBuilder extends ReferenceMessageBuilder {

    public buildTransformedReferenceMessage(reference: IReference, attachmentName: string): EmbedBuilder {
        const embedBuilder: EmbedBuilder = new EmbedBuilder();
        embedBuilder.setColor(0x0099FF)
            .setTitle('Transformed: Reference pose')
            .setDescription("Reference retrieved from Quickposes. All rights reserve to them.")
            .addFields(
                { name: 'Reference image', value: reference.url },
                { name: 'Reference source', value: "https://quickposes.com/random" },
                { name: 'Owner', value: reference.owner },
                { name: 'Height', value: reference.height.toString() },
                { name: 'Width', value: reference.width.toString() }
            )
            .setImage(`attachment://${attachmentName}`)
            .setFooter({ text: "Copyright: Quickposes", iconURL: "https://quickposes.com/apple-touch-icon.png" })
            .setTimestamp();

        return embedBuilder;
    }

    public buildReferenceMessage(reference: IReference): EmbedBuilder {
        const embedBuilder: EmbedBuilder = new EmbedBuilder();
        embedBuilder.setColor(0x0099FF)
            .setTitle('Original: Reference pose')
            .setDescription("Reference retrieved from Quickposes. All rights reserve to them.")
            .addFields(
                { name: 'Reference image', value: reference.url },
                { name: 'Reference source', value: "https://quickposes.com/random" },
                { name: 'Owner', value: reference.owner },
                { name: 'Height', value: reference.height.toString() },
                { name: 'Width', value: reference.width.toString() }
            )
            .setImage(reference.url)
            .setFooter({ text: "Copyright: Quickposes", iconURL: "https://quickposes.com/apple-touch-icon.png" })
            .setTimestamp();

        return embedBuilder;
    }

}