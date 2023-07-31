"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommand = void 0;
const discord_js_1 = require("discord.js");
const QuickPoseMessageBuilder_1 = require("../messageBuilders/QuickPoseMessageBuilder");
const QuickPoseReferenceRetrieverService_1 = require("../referenceRetrieval/QuickPoseReferenceRetrieverService");
const CommandType_1 = require("./CommandType");
const DeviantArtReferenceRetrieverService_1 = require("../referenceRetrieval/DeviantArtReferenceRetrieverService");
const GoogleReferenceRetrieverService_1 = require("../referenceRetrieval/GoogleReferenceRetrieverService");
const DeviantArtReferenceMessageBuilder_1 = require("../messageBuilders/DeviantArtReferenceMessageBuilder");
const GoogleReferenceMessageBuilder_1 = require("../messageBuilders/GoogleReferenceMessageBuilder");
class SlashCommand {
    _data;
    _name;
    _type;
    _description;
    _options;
    referenceService;
    messageBuilder;
    constructor(name, description, type, options, commandType) {
        this._name = name;
        this._description = description;
        this._type = type;
        this._options = options;
        this._data = new discord_js_1.SlashCommandBuilder();
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
    initSlashCommand() {
        this._data.setName(this.name)
            .setDescription(this.description);
        this.options.forEach(option => {
            let stringOption = new discord_js_1.SlashCommandStringOption();
            stringOption.setRequired(option.required);
            stringOption.setName(option.name);
            stringOption.setDescription(option.description);
            option.choices.forEach(choiceOption => {
                stringOption.addChoices(choiceOption);
            });
            this._data.addStringOption(stringOption);
        });
    }
    async execute(interaction) {
        const reference = await this.referenceService.getReference(this);
        const embedBuilder = this.messageBuilder.buildReferenceMessage(reference);
        return await interaction.reply({ embeds: [embedBuilder] });
    }
    get data() {
        return this._data;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get type() {
        return this._type;
    }
    set type(type) {
        this._type = type;
    }
    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description;
    }
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = value;
    }
}
exports.SlashCommand = SlashCommand;
//# sourceMappingURL=SlashCommand.js.map