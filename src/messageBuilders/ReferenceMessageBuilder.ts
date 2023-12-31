import { ActionRowBuilder, AttachmentBuilder, AttachmentData, ButtonBuilder, EmbedBuilder, MessageActionRowComponentBuilder } from "discord.js";
import { IReferenceButton } from "../referenceButtons/IReferenceButton";
import { ReferenceButton } from "../referenceButtons/ReferenceButton";
import { IReference } from "../referenceRetrieval/IReference";
import { IReferenceMessageBuilder } from "./IReferenceMessageBuilder";

export abstract class ReferenceMessageBuilder implements IReferenceMessageBuilder {

    buildReferenceMessage(reference: IReference): EmbedBuilder {
        throw new Error("Method not implemented. Retrieved reference: " + reference);
    }

    public buildTransformedReferenceAttachment(buffer: Buffer): AttachmentBuilder {
        const attachmentData: AttachmentData = {
            name: 'reference.png',
            description: 'transformed reference'
        };
        const attachementBuilder: AttachmentBuilder = new AttachmentBuilder(buffer, attachmentData);
        return attachementBuilder;
    }

    public buildTransformedReferenceMessage(reference: IReference, attachmentName: string): EmbedBuilder {
        throw new Error("Method not implemented." + reference + attachmentName);
    }

    public buildReferenceButtons(referenceButtonsFiles: Array<string>): Array<ActionRowBuilder<MessageActionRowComponentBuilder>> {
        const rows: Array<ActionRowBuilder<MessageActionRowComponentBuilder>> = new Array();
        let actionRowBuilder: ActionRowBuilder<MessageActionRowComponentBuilder> = new ActionRowBuilder();
        rows.push(actionRowBuilder);

        try {
            let buttonCount = 1;
            referenceButtonsFiles.forEach(referenceButtonFile => {

                if (buttonCount == 5) {
                    actionRowBuilder = new ActionRowBuilder();
                    rows.push(actionRowBuilder);
                    buttonCount = 1;
                }

                const referenceButton: IReferenceButton = Object.assign(new ReferenceButton(), require(referenceButtonFile));
                const buttonBuilder: ButtonBuilder = new ButtonBuilder();
                buttonBuilder.setCustomId(referenceButton.customId);
                buttonBuilder.setLabel(referenceButton.label);
                buttonBuilder.setStyle(referenceButton.style);
                actionRowBuilder.addComponents(buttonBuilder);
                buttonCount++;

            });
        } catch (error: any) {
            console.log(error);
        }
        return rows;
    }

}