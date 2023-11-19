"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceMessageBuilder = void 0;
const discord_js_1 = require("discord.js");
const ReferenceButton_1 = require("../referenceButtons/ReferenceButton");
class ReferenceMessageBuilder {
    buildReferenceMessage(reference) {
        throw new Error("Method not implemented. Retrieved reference: " + reference);
    }
    buildTransformedReferenceAttachment(buffer) {
        const attachmentData = {
            name: 'reference.png',
            description: 'transformed reference'
        };
        const attachementBuilder = new discord_js_1.AttachmentBuilder(buffer, attachmentData);
        return attachementBuilder;
    }
    buildTransformedReferenceMessage(reference, attachmentName) {
        throw new Error("Method not implemented." + reference + attachmentName);
    }
    buildReferenceButtons(referenceButtonsFiles) {
        const rows = new Array();
        let actionRowBuilder = new discord_js_1.ActionRowBuilder();
        rows.push(actionRowBuilder);
        try {
            let buttonCount = 1;
            referenceButtonsFiles.forEach(referenceButtonFile => {
                if (buttonCount == 5) {
                    actionRowBuilder = new discord_js_1.ActionRowBuilder();
                    rows.push(actionRowBuilder);
                    buttonCount = 1;
                }
                const referenceButton = Object.assign(new ReferenceButton_1.ReferenceButton(), require(referenceButtonFile));
                const buttonBuilder = new discord_js_1.ButtonBuilder();
                buttonBuilder.setCustomId(referenceButton.customId);
                buttonBuilder.setLabel(referenceButton.label);
                buttonBuilder.setStyle(referenceButton.style);
                actionRowBuilder.addComponents(buttonBuilder);
                buttonCount++;
            });
        }
        catch (error) {
            console.log(error);
        }
        return rows;
    }
}
exports.ReferenceMessageBuilder = ReferenceMessageBuilder;
