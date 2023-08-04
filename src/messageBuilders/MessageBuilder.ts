import { ActionRowBuilder, AttachmentBuilder, ButtonBuilder, EmbedBuilder, MessageActionRowComponentBuilder } from "discord.js";
import path from "path";
import { ComponentFilesHelper } from "../ComponentFilesHelper";
import { IReference } from "../referenceRetrieval/IReference";
import { IMessageBuilder } from "./IMessageBuilder";
import { IReferenceButton } from "./referenceButtons/IReferenceButton";
import { ReferenceButton } from "./referenceButtons/ReferenceButton";

export abstract class MessageBuilder implements IMessageBuilder {

    private componentFilesHelper: ComponentFilesHelper;

    constructor() {
        this.componentFilesHelper = new ComponentFilesHelper();
    }

    buildReferenceMessage(reference: IReference): EmbedBuilder {
        throw new Error("Method not implemented. Retrieved reference: " + reference);
    }

    public buildImageAttachment(buffer: Buffer): AttachmentBuilder {
        const attachementBuilder: AttachmentBuilder = new AttachmentBuilder(buffer);
        return attachementBuilder;
    }

    public buildReferenceButtons(): Array<ActionRowBuilder<MessageActionRowComponentBuilder>> {
        const rows: Array<ActionRowBuilder<MessageActionRowComponentBuilder>> = new Array();
        let actionRowBuilder: ActionRowBuilder<MessageActionRowComponentBuilder> = new ActionRowBuilder();
        rows.push(actionRowBuilder);

        try {
            this.componentFilesHelper.findJSONComponentFiles(path.join(__dirname, 'referenceButtons/referenceButtonJSON'));
            const referenceButtonsFiles: Array<string> = this.componentFilesHelper.componentFiles;
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