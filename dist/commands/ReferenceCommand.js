"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceCommand = void 0;
const DeviantArtReferenceMessageBuilder_1 = require("../messageBuilders/DeviantArtReferenceMessageBuilder");
const GoogleReferenceMessageBuilder_1 = require("../messageBuilders/GoogleReferenceMessageBuilder");
const QuickPoseMessageBuilder_1 = require("../messageBuilders/QuickPoseMessageBuilder");
const DeviantArtReferenceRetrieverService_1 = require("../referenceRetrieval/DeviantArtReferenceRetrieverService");
const GoogleReferenceRetrieverService_1 = require("../referenceRetrieval/GoogleReferenceRetrieverService");
const QuickPoseReferenceRetrieverService_1 = require("../referenceRetrieval/QuickPoseReferenceRetrieverService");
const CommandType_1 = require("./CommandType");
const SlashCommand_1 = require("./SlashCommand");
class ReferenceCommand extends SlashCommand_1.SlashCommand {
    referenceService;
    messageBuilder;
    constructor(name, description, options, commandType) {
        super(name, description, options);
        switch (commandType) {
            case CommandType_1.CommandType.Quickpose:
                this.referenceService = new QuickPoseReferenceRetrieverService_1.QuickPoseReferenceRetrieverService();
                this.messageBuilder = new QuickPoseMessageBuilder_1.QuickPoseMessageBuilder();
                break;
            case CommandType_1.CommandType.DeviantArt:
                this.referenceService = new DeviantArtReferenceRetrieverService_1.DeviantArtReferenceRetrieverService();
                this.messageBuilder = new DeviantArtReferenceMessageBuilder_1.DeviantArtReferenceMessageBuilder();
                break;
            case CommandType_1.CommandType.Google:
                this.referenceService = new GoogleReferenceRetrieverService_1.GoogleReferenceRetrieverService();
                this.messageBuilder = new GoogleReferenceMessageBuilder_1.GoogleReferenceMessageBuilder();
                break;
            default:
                this.referenceService = new QuickPoseReferenceRetrieverService_1.QuickPoseReferenceRetrieverService();
                this.messageBuilder = new QuickPoseMessageBuilder_1.QuickPoseMessageBuilder();
                break;
        }
    }
    async mirrorHorizontal(reference, interaction) {
        const transformedReference = await this.referenceService.mirrorHorizontal(reference);
        await this.sendReply(interaction, transformedReference);
    }
    async mirrorVertical(reference, interaction) {
        const transformedReference = await this.referenceService.mirrorVertical(reference);
        await this.sendReply(interaction, transformedReference);
    }
    async rotateClockwise(reference, interaction) {
        const transformedReference = await this.referenceService.rotateClockwise(reference);
        await this.sendReply(interaction, transformedReference);
    }
    async rotateCounterClockwise(reference, interaction) {
        const transformedReference = await this.referenceService.rotateCounterClockwise(reference);
        await this.sendReply(interaction, transformedReference);
    }
    async sharpen(reference, interaction) {
        const transformedReference = await this.referenceService.sharpen(reference);
        await this.sendReply(interaction, transformedReference);
    }
    async blur(reference, interaction) {
        const transformedReference = await this.referenceService.blur(reference);
        await this.sendReply(interaction, transformedReference);
    }
    async greyscale(reference, interaction) {
        const transformedReference = await this.referenceService.greyscale(reference);
        await this.sendReply(interaction, transformedReference);
    }
    async negate(reference, interaction) {
        const transformedReference = await this.referenceService.negate(reference);
        await this.sendReply(interaction, transformedReference);
    }
    async normalize(reference, interaction) {
        const transformedReference = await this.referenceService.normalize(reference);
        await this.sendReply(interaction, transformedReference);
    }
    async median(reference, interaction) {
        const transformedReference = await this.referenceService.median(reference);
        await this.sendReply(interaction, transformedReference);
    }
    async execute(interaction) {
        const reference = await this.referenceService.getReference(this);
        await this.sendReply(interaction, reference);
    }
    async sendReply(interaction, reference) {
        const embedBuilder = this.messageBuilder.buildReferenceMessage(reference);
        const rows = this.messageBuilder.buildReferenceButtons();
        if (reference.imageData.length > 0) {
            const attachementBuilder = this.messageBuilder.buildTransformedReferenceAttachment(reference.imageData);
            const attachmentName = attachementBuilder.name !== null ? attachementBuilder.name : '';
            const transformedReferenceEmbedBuilder = this.messageBuilder.buildTransformedReferenceMessage(reference, attachmentName);
            await interaction.followUp({ embeds: [embedBuilder, transformedReferenceEmbedBuilder], files: [attachementBuilder], components: rows });
        }
        else {
            await interaction.followUp({ embeds: [embedBuilder], components: rows });
        }
    }
}
exports.ReferenceCommand = ReferenceCommand;
//# sourceMappingURL=ReferenceCommand.js.map