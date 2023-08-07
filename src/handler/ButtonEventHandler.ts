import { ButtonInteraction, CacheType, Embed } from "discord.js";
import { DefaultCommand } from "../commands/poseCommands/DefaultCommand";
import { ReferenceButtonIds } from "../messageBuilders/referenceButtons/ReferenceButtonIds";
import { IReference } from "../referenceRetrieval/IReference";
import { QuickPoseReference } from "../referenceRetrieval/QuickPoseReference";
import { IDiscordEventHandler } from "./IDiscordEventHandler";

export class ButtonEventHandler implements IDiscordEventHandler {

    public async handle(interaction: ButtonInteraction<CacheType>): Promise<void> {
        await interaction.deferReply({ ephemeral: false });

        const embeds: Array<Embed> = interaction.message.embeds;

        if (embeds.length === 0) {
            await interaction.reply({ content: 'There was an error while executing this interaction!', ephemeral: true });
        }

        const embed: Embed = embeds.length === 1 ? embeds[0] : embeds[1];

        const reference: IReference = new QuickPoseReference();
        reference.url = embed.fields[0].value;
        reference.owner = embed.fields[2].value;
        reference.height = +embed.fields[3].value;
        reference.width = +embed.fields[4].value;

        if (embed.image !== undefined) {
            reference.url = embed.image?.url !== undefined ? embed.image.url : reference.url;
        }

        await this.transformReference(reference, interaction);

    }

    private async transformReference(reference: IReference, interaction: ButtonInteraction<CacheType>): Promise<void> {
        const defaultCommand: DefaultCommand = new DefaultCommand();

        switch (interaction.customId) {
            case ReferenceButtonIds[ReferenceButtonIds.mirrorHorizontalEvent]:
                await defaultCommand.mirrorHorizontal(reference, interaction);
                break;
            case ReferenceButtonIds[ReferenceButtonIds.mirrorVerticalEvent]:
                await defaultCommand.mirrorVertical(reference, interaction);
                break;
            case ReferenceButtonIds[ReferenceButtonIds.rotateClockwiseEvent]:
                await defaultCommand.rotateClockwise(reference, interaction);
                break;
            case ReferenceButtonIds[ReferenceButtonIds.rotateCounterClockwiseEvent]:
                await defaultCommand.rotateCounterClockwise(reference, interaction);
                break;
            case ReferenceButtonIds[ReferenceButtonIds.sharpenEvent]:
                await defaultCommand.sharpen(reference, interaction);
                break;
            case ReferenceButtonIds[ReferenceButtonIds.blurEvent]:
                await defaultCommand.blur(reference, interaction);
                break;
            case ReferenceButtonIds[ReferenceButtonIds.negateEvent]:
                await defaultCommand.negate(reference, interaction);
                break;
            case ReferenceButtonIds[ReferenceButtonIds.greyscaleEvent]:
                await defaultCommand.greyscale(reference, interaction);
                break;
            case ReferenceButtonIds[ReferenceButtonIds.normalizeEvent]:
                await defaultCommand.normalize(reference, interaction);
                break;
            case ReferenceButtonIds[ReferenceButtonIds.medianEvent]:
                await defaultCommand.median(reference, interaction);
                break;
        }
    }

}