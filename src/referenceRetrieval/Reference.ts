import { IReference } from "./IReference";

export class Reference implements IReference {

    private _url: string;
    private _width: number;
    private _height: number;
    private _owner: string;
    private _imageData: Buffer;

    constructor(url: string = '', width: number = 0, height: number = 0, owner: string = '', imageData?: Buffer) {
        this._url = url;
        this._width = width;
        this._height = height;
        this._owner = owner;
        this._imageData = imageData !== undefined ? imageData : Buffer.from("");
    }

    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }

    get owner(): string {
        return this._owner;
    }

    set owner(value: string) {
        this._owner = value;
    }

    get imageData(): Buffer {
        return this._imageData;
    }

    set imageData(value: Buffer) {
        this._imageData = value;
    }

}