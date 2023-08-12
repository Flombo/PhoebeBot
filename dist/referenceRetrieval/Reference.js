"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reference = void 0;
class Reference {
    _url;
    _width;
    _height;
    _owner;
    _imageData;
    constructor(url = '', width = 0, height = 0, owner = '', imageData) {
        this._url = url;
        this._width = width;
        this._height = height;
        this._owner = owner;
        this._imageData = imageData !== undefined ? imageData : Buffer.from("");
    }
    get url() {
        return this._url;
    }
    set url(value) {
        this._url = value;
    }
    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
    }
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
    }
    get owner() {
        return this._owner;
    }
    set owner(value) {
        this._owner = value;
    }
    get imageData() {
        return this._imageData;
    }
    set imageData(value) {
        this._imageData = value;
    }
}
exports.Reference = Reference;
//# sourceMappingURL=Reference.js.map