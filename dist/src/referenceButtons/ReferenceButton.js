"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceButton = void 0;
class ReferenceButton {
    _customId;
    _label;
    _style;
    constructor(customId = '', label = '', style = 1) {
        this._customId = customId;
        this._label = label;
        this._style = style;
    }
    get customId() {
        return this._customId;
    }
    set customId(value) {
        this._customId = value;
    }
    get label() {
        return this._label;
    }
    set label(value) {
        this._label = value;
    }
    get style() {
        return this._style;
    }
    set style(value) {
        this._style = value;
    }
}
exports.ReferenceButton = ReferenceButton;
