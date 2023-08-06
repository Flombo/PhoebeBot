"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonEventHandler = void 0;
const DefaultCommand_1 = require("../commands/poseCommands/DefaultCommand");
const ReferenceButtonIds_1 = require("../messageBuilders/referenceButtons/ReferenceButtonIds");
const QuickPoseReference_1 = require("../referenceRetrieval/QuickPoseReference");
class ButtonEventHandler {
    async handle(interaction) {
        await interaction.deferReply({ ephemeral: false });
        const embeds = interaction.message.embeds;
        if (embeds.length === 0) {
            await interaction.reply({ content: 'There was an error while executing this interaction!', ephemeral: true });
        }
        const embed = embeds.length === 1 ? embeds[0] : embeds[1];
        const reference = new QuickPoseReference_1.QuickPoseReference();
        reference.url = embed.fields[0].value;
        reference.owner = embed.fields[2].value;
        reference.height = +embed.fields[3].value;
        reference.width = +embed.fields[4].value;
        if (embed.image !== undefined) {
            reference.url = embed.image?.url !== undefined ? embed.image.url : reference.url;
        }
        await this.transformReference(reference, interaction);
    }
    async transformReference(reference, interaction) {
        const defaultCommand = new DefaultCommand_1.DefaultCommand();
        switch (interaction.customId) {
            case ReferenceButtonIds_1.ReferenceButtonIds[ReferenceButtonIds_1.ReferenceButtonIds.mirrorHorizontalEvent]:
                await defaultCommand.mirrorHorizontal(reference, interaction);
                break;
            case ReferenceButtonIds_1.ReferenceButtonIds[ReferenceButtonIds_1.ReferenceButtonIds.mirrorVerticalEvent]:
                await defaultCommand.mirrorVertical(reference, interaction);
                break;
            case ReferenceButtonIds_1.ReferenceButtonIds[ReferenceButtonIds_1.ReferenceButtonIds.rotateClockwiseEvent]:
                await defaultCommand.rotateClockwise(reference, interaction);
                break;
            case ReferenceButtonIds_1.ReferenceButtonIds[ReferenceButtonIds_1.ReferenceButtonIds.rotateCounterClockwiseEvent]:
                await defaultCommand.rotateCounterClockwise(reference, interaction);
                break;
            case ReferenceButtonIds_1.ReferenceButtonIds[ReferenceButtonIds_1.ReferenceButtonIds.sharpenEvent]:
                await defaultCommand.sharpen(reference, interaction);
                break;
            case ReferenceButtonIds_1.ReferenceButtonIds[ReferenceButtonIds_1.ReferenceButtonIds.blurEvent]:
                await defaultCommand.blur(reference, interaction);
                break;
            case ReferenceButtonIds_1.ReferenceButtonIds[ReferenceButtonIds_1.ReferenceButtonIds.negateEvent]:
                await defaultCommand.negate(reference, interaction);
                break;
            case ReferenceButtonIds_1.ReferenceButtonIds[ReferenceButtonIds_1.ReferenceButtonIds.greyscaleEvent]:
                await defaultCommand.greyscale(reference, interaction);
                break;
        }
    }
}
exports.ButtonEventHandler = ButtonEventHandler;
//# sourceMappingURL=ButtonEventHandler.js.map