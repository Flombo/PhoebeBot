import { ActionRowBuilder, AttachmentBuilder, ButtonInteraction, CacheType, ChatInputCommandInteraction, EmbedBuilder, MessageActionRowComponentBuilder, MessageComponentInteraction } from "discord.js";
import { DeviantArtReferenceMessageBuilder } from "../messageBuilders/DeviantArtReferenceMessageBuilder";
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
    private referenceButtonsFiles: Array<string>;

    constructor(name: string, description: string, options: Array<CommandOptionChoice>, commandType: CommandType, referenceButtonsFiles: Array<string>) {
        super(name, description, options);
        this.referenceButtonsFiles = referenceButtonsFiles;
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
                this.messageBuilder = new QuickPoseMessageBuilder();
                break;
            default:
                this.referenceService = new QuickPoseReferenceRetrieverService();
                this.messageBuilder = new QuickPoseMessageBuilder();
                break;
        }
    }

    public async mirrorHorizontal(reference: IReference, interaction: ButtonInteraction<CacheType>): Promise<void> {
        const transformedReference: IReference = await this.referenceService.mirrorHorizontal(reference);
        await this.sendReply(interaction, new Array(transformedReference));
    }

    public async mirrorVertical(reference: IReference, interaction: ButtonInteraction<CacheType>): Promise<void> {
        const transformedReference: IReference = await this.referenceService.mirrorVertical(reference);
        await this.sendReply(interaction, new Array(transformedReference));
    }

    public async rotateClockwise(reference: IReference, interaction: ButtonInteraction<CacheType>): Promise<void> {
        const transformedReference: IReference = await this.referenceService.rotateClockwise(reference);
        await this.sendReply(interaction, new Array(transformedReference));
    }

    public async rotateCounterClockwise(reference: IReference, interaction: ButtonInteraction<CacheType>): Promise<void> {
        const transformedReference: IReference = await this.referenceService.rotateCounterClockwise(reference);
        await this.sendReply(interaction, new Array(transformedReference));
    }

    public async sharpen(reference: IReference, interaction: ButtonInteraction<CacheType>): Promise<void> {
        const transformedReference: IReference = await this.referenceService.sharpen(reference);
        await this.sendReply(interaction, new Array(transformedReference));
    }

    public async blur(reference: IReference, interaction: ButtonInteraction<CacheType>): Promise<void> {
        const transformedReference: IReference = await this.referenceService.blur(reference);
        await this.sendReply(interaction, new Array(transformedReference));
    }

    public async greyscale(reference: IReference, interaction: ButtonInteraction<CacheType>): Promise<void> {
        const transformedReference: IReference = await this.referenceService.greyscale(reference);
        await this.sendReply(interaction, new Array(transformedReference));
    }

    public async negate(reference: IReference, interaction: ButtonInteraction<CacheType>): Promise<void> {
        const transformedReference: IReference = await this.referenceService.negate(reference);
        await this.sendReply(interaction, new Array(transformedReference));
    }

    public async normalize(reference: IReference, interaction: ButtonInteraction<CacheType>): Promise<void> {
        const transformedReference: IReference = await this.referenceService.normalize(reference);
        await this.sendReply(interaction, new Array(transformedReference));
    }

    public async median(reference: IReference, interaction: ButtonInteraction<CacheType>): Promise<void> {
        const transformedReference: IReference = await this.referenceService.median(reference);
        await this.sendReply(interaction, new Array(transformedReference));
    }

    public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const references: Array<IReference> = await this.referenceService.getReference(this);
        await this.sendReply(interaction, references);
    }

    private async sendReply(interaction: MessageComponentInteraction | ChatInputCommandInteraction, references: Array<IReference>): Promise<void> {

        const embedBuilders: Array<EmbedBuilder> = new Array();
        references.forEach(reference => {
            embedBuilders.push(this.messageBuilder.buildReferenceMessage(reference));
        });

        const rows: Array<ActionRowBuilder<MessageActionRowComponentBuilder>> = this.messageBuilder.buildReferenceButtons(this.referenceButtonsFiles);

        const reference: IReference = references[0];

        if (reference.imageData.length > 0) {
            const attachementBuilder: AttachmentBuilder = this.messageBuilder.buildTransformedReferenceAttachment(reference.imageData);
            const attachmentName: string = attachementBuilder.name !== null ? attachementBuilder.name : '';
            const transformedReferenceEmbedBuilder: EmbedBuilder = this.messageBuilder.buildTransformedReferenceMessage(reference, attachmentName);
            embedBuilders.push(transformedReferenceEmbedBuilder);
            await interaction.followUp({ embeds: embedBuilders, files: [attachementBuilder], components: rows });
        } else {
            await interaction.followUp({ embeds: embedBuilders, components: rows });
        }
    }

}