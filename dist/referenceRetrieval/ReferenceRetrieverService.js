"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceRetrieverService = void 0;
const tslib_1 = require("tslib");
const sharp_1 = tslib_1.__importDefault(require("sharp"));
class ReferenceRetrieverService {
    angle = 270;
    getReference(command) {
        throw new Error("Method not implemented. Used command: " + command);
    }
    async mirrorHorizontal(reference) {
        if (reference.imageData.length > 0) {
            reference.imageData = await (0, sharp_1.default)(reference.imageData).flop().toBuffer();
        }
        else {
            const image = await fetch(reference.url);
            const buffer = Buffer.from(await image.arrayBuffer());
            reference.imageData = await (0, sharp_1.default)(buffer).flop().toBuffer();
        }
        return reference;
    }
    async mirrorVertical(reference) {
        if (reference.imageData.length > 0) {
            reference.imageData = await (0, sharp_1.default)(reference.imageData).flip().toBuffer();
        }
        else {
            const image = await fetch(reference.url);
            const buffer = Buffer.from(await image.arrayBuffer());
            reference.imageData = await (0, sharp_1.default)(buffer).flip().toBuffer();
        }
        return reference;
    }
    async rotateClockwise(reference) {
        if (reference.imageData.length > 0) {
            reference.imageData = await (0, sharp_1.default)(reference.imageData).rotate(-this.angle).toBuffer();
        }
        else {
            const image = await fetch(reference.url);
            const buffer = Buffer.from(await image.arrayBuffer());
            reference.imageData = await (0, sharp_1.default)(buffer).rotate(-this.angle).toBuffer();
        }
        return reference;
    }
    async rotateCounterClockwise(reference) {
        if (reference.imageData.length > 0) {
            reference.imageData = await (0, sharp_1.default)(reference.imageData).rotate(this.angle).toBuffer();
        }
        else {
            const image = await fetch(reference.url);
            const buffer = Buffer.from(await image.arrayBuffer());
            reference.imageData = await (0, sharp_1.default)(buffer).rotate(this.angle).toBuffer();
        }
        return reference;
    }
    negate(reference) {
        throw new Error("Method not implemented. ref: " + reference);
    }
    blur(reference) {
        throw new Error("Method not implemented. ref: " + reference);
    }
    sharpen(reference) {
        throw new Error("Method not implemented. ref: " + reference);
    }
    greyscale(reference) {
        throw new Error("Method not implemented. ref: " + reference);
    }
    blackAndWhite(reference) {
        throw new Error("Method not implemented. ref: " + reference);
    }
}
exports.ReferenceRetrieverService = ReferenceRetrieverService;
//# sourceMappingURL=ReferenceRetrieverService.js.map