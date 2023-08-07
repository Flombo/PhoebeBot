import { ActionRowBuilder, AttachmentBuilder, ButtonInteraction, CacheType, ChatInputCommandInteraction, EmbedBuilder, MessageActionRowComponentBuilder, MessageComponentInteraction } from "discord.js";
import { DeviantArtReferenceMessageBuilder } from "../messageBuilders/DeviantArtReferenceMessageBuilder";
import { GoogleReferenceMessageBuilder } from "../messageBuilders/GoogleReferenceMessageBuilder";
import { IReferenceMessageBuilder } from "../messageBuilders/IReferenceMessageBuilder";
import { QuickPoseMessageBuilder } from "../messageBuilders/QuickPoseMessageBuilder";
import { DeviantArtReferenceRetrieverService } from "../referenceRetrieval/DeviantArtReferenceRetrieverService";
import { GoogleReferenceRetrieverService } from "../referenceRetrieval/GoogleReferenceRetrieverService";
import { IReference } from "../referenceRetrieval/IReference";
import { IReferenceRetrieverService } from "../referenceRetrieval/IReferenceRetrieverService";
import { QuickPoseReferenceRetrieverService } from "../referenceRetrieval/QuickPoseReferenceRetrieverService";
import { CommandOptionChoice } from "./CommandOptionChoice";
import { CommandType } from "./CommandType";
import { IReferenceCommand } from "./IReferenceCommand";
import { SlashCommand } from "./SlashCommand";

export abstract class ReferenceCommand extends SlashCommand implements IReferenceCommand {

    private referenceService: IReferenceRetrieverService;
    private messageBuilder: IReferenceMessageBuilder;

    constructor(name: string, description: string, options: Array<CommandOptionChoice>, commandType: CommandType) {
        super(name, description, options);

        switch (commandType) {
            case CommandType.Quickpose:
                this.referenceService = new QuickPoseReferenceRetrieverService();
                this.messageBuilder = new QuickPoseMessageBuilder();
                break;
            case CommandType.DeviantArt:
                this.referenceService = new DeviantArtReferenceRetrieverService();
                this.messageBuilder = new DeviantArtReferenceMessageBuilder();
                break;
            case CommandType.Google:
                this.referenceService = new GoogleReferenceRetrieverService();
                this.messageBuilder = new GoogleReferenceMessageBuilder();
                break;
            default:
                this.referenceService = new QuickPoseReferenceRetrieverService();
                this.messageBuilder = new QuickPoseMessageBuilder();
                break;
        }
    }

    public async mirrorHorizontal(reference: IReference, interaction: ButtonInteraction<CacheType>): Promise<void> {
        const transformedReference: IReference = await this.referenceService.mirrorHorizontal(reference);
        await this.sendReply(interaction, transformedReference);
    }

    public async mirrorVertical(reference: IReference, interaction: ButtonInteraction<CacheType>): Promise<void> {
        const transformedReference: IReference = await this.referenceService.mirrorVertical(reference);
        await this.sendReply(interaction, transformedReference);
    }

    public async rotateClockwise(reference: IReference, interaction: ButtonInteraction<CacheType>): Promise<void> {
        const transformedReference: IReference = await this.referenceService.rotateClockwise(reference);
        await this.sendReply(interaction, transformedReference);
    }

    public async rotateCounterClockwise(reference: IReference, interaction: ButtonInteraction<CacheType>): Promise<void> {
        const transformedReference: IReference = await this.referenceService.rotateCounterClockwise(reference);
        await this.sendReply(interaction, transformedReference);
    }

    public async sharpen(reference: IReference, interaction: ButtonInteraction<CacheType>): Promise<void> {
        const transformedReference: IReference = await this.referenceService.sharpen(reference);
        await this.sendReply(interaction, transformedReference);
    }

    public async blur(reference: IReference, interaction: ButtonInteraction<CacheType>): Promise<void> {
        const transformedReference: IReference = await this.referenceService.blur(reference);
        await this.sendReply(interaction, transformedReference);
    }

    public async greyscale(reference: IReference, interaction: ButtonInteraction<CacheType>): Promise<void> {
        const transformedReference: IReference = await this.referenceService.greyscale(reference);
        await this.sendReply(interaction, transformedReference);
    }

    public async negate(reference: IReference, interaction: ButtonInteraction<CacheType>): Promise<void> {
        const transformedReference: IReference = await this.referenceService.negate(reference);
        await this.sendReply(interaction, transformedReference);
    }

    public async normalize(reference: IReference, interaction: ButtonInteraction<CacheType>): Promise<void> {
        const transformedReference: IReference = await this.referenceService.normalize(reference);
        await this.sendReply(interaction, transformedReference);
    }

    public async median(reference: IReference, interaction: ButtonInteraction<CacheType>): Promise<void> {
        const transformedReference: IReference = await this.referenceService.median(reference);
        await this.sendReply(interaction, transformedReference);
    }

    public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const reference: IReference = await this.referenceService.getReference(this);
        await this.sendReply(interaction, reference);
    }

    private async sendReply(interaction: MessageComponentInteraction | ChatInputCommandInteraction, reference: IReference): Promise<void> {
        const embedBuilder: EmbedBuilder = this.messageBuilder.buildReferenceMessage(reference);
        const rows: Array<ActionRowBuilder<MessageActionRowComponentBuilder>> = this.messageBuilder.buildReferenceButtons();

        if (reference.imageData.length > 0) {
            const attachementBuilder: AttachmentBuilder = this.messageBuilder.buildTransformedReferenceAttachment(reference.imageData);
            const attachmentName: string = attachementBuilder.name !== null ? attachementBuilder.name : '';
            const transformedReferenceEmbedBuilder: EmbedBuilder = this.messageBuilder.buildTransformedReferenceMessage(reference, attachmentName);
            await interaction.followUp({ embeds: [embedBuilder, transformedReferenceEmbedBuilder], files: [attachementBuilder], components: rows });
        } else {
            await interaction.followUp({ embeds: [embedBuilder], components: rows });
        }
    }

}