"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommand = void 0;
const discord_js_1 = require("discord.js");
class SlashCommand {
    _data;
    _name;
    _description;
    _options;
    constructor(name, description, options) {
        this._name = name;
        this._description = description;
        this._options = options;
        this._data = new discord_js_1.SlashCommandBuilder();
    }
    execute(interaction) {
        throw new Error("Method not implemented. With interaction:" + interaction);
    }
    initSlashCommand() {
        this._data.setName(this.name)
            .setDescription(this.description);
        this.options.forEach(option => {
            const type = option.type;
            let slashCommandOption;
            switch (type) {
                case 3:
                    slashCommandOption = new discord_js_1.SlashCommandStringOption();
                    slashCommandOption.setRequired(option.required);
                    slashCommandOption.setName(option.name);
                    slashCommandOption.setDescription(option.description);
                    if (option.choices !== undefined) {
                        option.choices.forEach((choiceOption) => {
                            slashCommandOption.addChoices(choiceOption);
                        });
                    }
                    this._data.addStringOption(slashCommandOption);
                    break;
                case 5:
                    slashCommandOption = new discord_js_1.SlashCommandBooleanOption();
                    slashCommandOption.setRequired(option.required);
                    slashCommandOption.setName(option.name);
                    slashCommandOption.setDescription(option.description);
                    this._data.addBooleanOption(slashCommandOption);
                    break;
                case 4:
                    slashCommandOption = new discord_js_1.SlashCommandIntegerOption();
                    slashCommandOption.setRequired(option.required);
                    slashCommandOption.setName(option.name);
                    slashCommandOption.setDescription(option.description);
                    slashCommandOption.setMinValue(option.min);
                    slashCommandOption.setMaxValue(option.max);
                    this._data.addIntegerOption(slashCommandOption);
                    break;
            }
        });
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
    getSelectedChoices() {
        let selectedChoices = new Array();
        this.options.forEach((option) => {
            selectedChoices.push(...(option.choices.filter((choice) => choice.selected)));
        });
        return selectedChoices;
    }
}
exports.SlashCommand = SlashCommand;
