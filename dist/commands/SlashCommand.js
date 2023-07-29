"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommand = void 0;
const discord_js_1 = require("discord.js");
class SlashCommand {
    _slashCommandBuilder;
    _name;
    _type;
    _description;
    _choices;
    constructor(name, description, choices) {
        this._name = name;
        this._description = description;
        this._choices = choices;
        this._slashCommandBuilder = new discord_js_1.SlashCommandBuilder();
        this.initSlashCommand(name, description, choices);
    }
    initSlashCommand(name, description, choices) {
        this._slashCommandBuilder.setName(name)
            .setDescription(description);
        choices.forEach(choice => {
            let stringOption = new discord_js_1.SlashCommandStringOption();
            stringOption.setRequired(choice.required);
            stringOption.setName(choice.name);
            stringOption.setDescription(choice.description);
            choice.choices.forEach(choiceOption => stringOption.addChoices(choiceOption));
            this._slashCommandBuilder.addStringOption(stringOption);
        });
    }
    async execute(interaction) {
        throw new Error("Method not implemented.");
    }
    get slashCommandBuilder() {
        return this._slashCommandBuilder;
    }
    set slashCommandBuilder(value) {
        this._slashCommandBuilder = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    get choices() {
        return this._choices;
    }
    set choices(value) {
        this._choices = value;
    }
}
exports.SlashCommand = SlashCommand;
//# sourceMappingURL=SlashCommand.js.map