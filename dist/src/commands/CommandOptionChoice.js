"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandOptionChoice = void 0;
class CommandOptionChoice {
    _name;
    _value;
    _description;
    _required;
    _type;
    _choices;
    _min;
    _max;
    constructor(name, value = '', description, required, type, choices, min = 0, max = 0) {
        this._name = name;
        this._value = value;
        this._description = description;
        this._required = required;
        this._type = type;
        this._choices = choices;
        this._min = min;
        this._max = max;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
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
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    get choices() {
        return this._choices;
    }
    set choices(value) {
        this._choices = value;
    }
    get min() {
        return this._min;
    }
    set min(value) {
        this._min = value;
    }
    get max() {
        return this._max;
    }
    set max(value) {
        this._max = value;
    }
}
exports.CommandOptionChoice = CommandOptionChoice;
