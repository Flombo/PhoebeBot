import { ActionRowBuilder, AttachmentBuilder, ButtonInteraction, CacheType, ChatInputCommandInteraction, EmbedBuilder, MessageActionRowComponentBuilder, MessageComponentInteraction, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { DeviantArtReferenceMessageBuilder } from "../messageBuilders/DeviantArtReferenceMessageBuilder";
import { GoogleReferenceMessageBuilder } from "../messageBuilders/GoogleReferenceMessageBuilder";
import { IMessageBuilder } from "../messageBuilders/IMessageBuilder";
import { QuickPoseMessageBuilder } from "../messageBuilders/QuickPoseMessageBuilder";
import { DeviantArtReferenceRetrieverService } from "../referenceRetrieval/DeviantArtReferenceRetrieverService";
import { GoogleReferenceRetrieverService } from "../referenceRetrieval/GoogleReferenceRetrieverService";
import { IReference } from "../referenceRetrieval/IReference";
import { IReferenceRetrieverService } from "../referenceRetrieval/IReferenceRetrieverService";
import { QuickPoseReferenceRetrieverService } from "../referenceRetrieval/QuickPoseReferenceRetrieverService";
import { Choice } from "./Choice";
import { CommandOptionChoice } from "./CommandOptionChoice";
import { CommandType } from "./CommandType";
import { IReferenceCommand } from "./IReferenceCommand";
import { PoseCommandType } from "./poseCommands/PoseCommandType";

export abstract class SlashCommand implements IReferenceCommand {

    private _data: SlashCommandBuilder;

    private _name: string;

    private _type: PoseCommandType;

    private _description: string;

    private _options: Array<CommandOptionChoice>;

    private referenceService: IReferenceRetrieverService;
    private messageBuilder: IMessageBuilder;

    constructor(name: string, description: string, type: PoseCommandType, options: Array<CommandOptionChoice>, commandType: CommandType) {
        this._name = name;
        this._description = description;
        this._type = type;
        this._options = options;
        this._data = new SlashCommandBuilder();

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

    /**
     * Adds data to the SlashCommandBuilder like description, options and name.
     */
    public initSlashCommand(): void {
        this._data.setName(this.name)
            .setDescription(this.description);

        this.options.forEach(option => {

            let stringOption = new SlashCommandStringOption();
            stringOption.setRequired(option.required);
            stringOption.setName(option.name);
            stringOption.setDescription(option.description);
            option.choices.forEach(choiceOption => {
                stringOption.addChoices(choiceOption)
            });

            this._data.addStringOption(stringOption);
        });
    }

    public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const reference: IReference = await this.referenceService.getReference(this);
        await this.sendReply(interaction, reference);
    }

    private async sendReply(interaction: MessageComponentInteraction | ChatInputCommandInteraction, reference: IReference): Promise<void> {
        const embedBuilder: EmbedBuilder = this.messageBuilder.buildReferenceMessage(reference);
        const rows: ActionRowBuilder<MessageActionRowComponentBuilder> = this.messageBuilder.buildReferenceButtons();

        if (reference.imageData.length > 0) {
            const attachementBuilder: AttachmentBuilder = this.messageBuilder.buildImageAttachment(reference.imageData);
            await interaction.followUp({ embeds: [embedBuilder], files: [attachementBuilder], components: [rows] });
        } else {
            await interaction.followUp({ embeds: [embedBuilder], components: [rows] });
        }
    }

    public get data(): SlashCommandBuilder {
        return this._data;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get type(): PoseCommandType {
        return this._type;
    }

    public set type(type: PoseCommandType) {
        this._type = type;
    }

    public get description(): string {
        return this._description;
    }

    public set description(description: string) {
        this._description = description;
    }

    public get options(): Array<CommandOptionChoice> {
        return this._options;
    }

    public set options(value: Array<CommandOptionChoice>) {
        this._options = value;
    }

    getSelectedChoices(): Array<Choice> {
        let selectedChoices: Array<Choice> = new Array();
        this.options.forEach((option: CommandOptionChoice) => {
            selectedChoices.push(...(option.choices.filter((choice: Choice) => choice.selected)));
        });
        return selectedChoices;
    }

}