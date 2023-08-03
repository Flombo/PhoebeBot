"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageBuilder = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const path_1 = tslib_1.__importDefault(require("path"));
const ComponentFilesHelper_1 = require("../ComponentFilesHelper");
const ReferenceButton_1 = require("./referenceButtons/ReferenceButton");
class MessageBuilder {
    componentFilesHelper;
    constructor() {
        this.componentFilesHelper = new ComponentFilesHelper_1.ComponentFilesHelper();
    }
    buildReferenceMessage(reference) {
        throw new Error("Method not implemented. Retrieved reference: " + reference);
    }
    buildImageAttachment(buffer) {
        const attachementBuilder = new discord_js_1.AttachmentBuilder(buffer);
        return attachementBuilder;
    }
    buildReferenceButtons() {
        const actionRowBuilder = new discord_js_1.ActionRowBuilder();
        try {
            this.componentFilesHelper.findJSONComponentFiles(path_1.default.join(__dirname, 'referenceButtons/referenceButtonJSON'));
            const referenceButtonsFiles = this.componentFilesHelper.componentFiles;
            referenceButtonsFiles.forEach(referenceButtonFile => {
                const referenceButton = Object.assign(new ReferenceButton_1.ReferenceButton(), require(referenceButtonFile));
                const buttonBuilder = new discord_js_1.ButtonBuilder();
                buttonBuilder.setCustomId(referenceButton.customId);
                buttonBuilder.setLabel(referenceButton.label);
                buttonBuilder.setStyle(referenceButton.style);
                actionRowBuilder.addComponents(buttonBuilder);
            });
        }
        catch (error) {
            console.log(error);
        }
        return actionRowBuilder;
    }
}
exports.MessageBuilder = MessageBuilder;
//# sourceMappingURL=MessageBuilder.js.map