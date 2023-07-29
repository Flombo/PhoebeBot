"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandOptionChoice = void 0;
class CommandOptionChoice {
    _name;
    _description;
    _required;
    _choices;
    constructor(name, description, required, choices) {
        this._name = name;
        this._description = description;
        this._required = required;
        this._choices = choices;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = value;
    }
    get choices() {
        return this._choices;
    }
    set choices(value) {
        this._choices = value;
    }
}
exports.CommandOptionChoice = CommandOptionChoice;
//# sourceMappingURL=CommandOptionChoice.js.map