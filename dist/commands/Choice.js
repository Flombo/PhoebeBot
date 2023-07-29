"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Choice = void 0;
class Choice {
    _name;
    _value;
    constructor(name, value) {
        this._name = name;
        this._value = value;
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
}
exports.Choice = Choice;
//# sourceMappingURL=Choice.js.map