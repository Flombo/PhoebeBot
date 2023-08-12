"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberChoice = void 0;
class NumberChoice {
    _name;
    _value;
    _selected;
    constructor(name, value) {
        this._name = name;
        this._value = value;
        this._selected = false;
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
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = value;
    }
}
exports.NumberChoice = NumberChoice;
//# sourceMappingURL=NumberChoice.js.map