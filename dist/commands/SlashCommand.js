"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommand = void 0;
const discord_js_1 = require("discord.js");
class SlashCommand {
    _data;
    _name;
    _type;
    _description;
    _options;
    constructor(name, description, type, options) {
        this._name = name;
        this._description = description;
        this._type = type;
        this._options = options;
        this._data = new discord_js_1.SlashCommandBuilder();
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
        throw new Error("Method not implemented.");
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