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
    async getBuffer(reference) {
        let buffer = reference.imageData;
        if (buffer.length == 0) {
            const image = await fetch(reference.url);
            buffer = Buffer.from(await image.arrayBuffer());
        }
        return buffer;
    }
    async mirrorHorizontal(reference) {
        const buffer = await this.getBuffer(reference);
        reference.imageData = await (0, sharp_1.default)(buffer).flop().toBuffer();
        return reference;
    }
    async mirrorVertical(reference) {
        const buffer = await this.getBuffer(reference);
        reference.imageData = await (0, sharp_1.default)(buffer).flip().toBuffer();
        return reference;
    }
    async rotateClockwise(reference) {
        const buffer = await this.getBuffer(reference);
        reference.imageData = await (0, sharp_1.default)(buffer).rotate(-this.angle).toBuffer();
        return reference;
    }
    async rotateCounterClockwise(reference) {
        const buffer = await this.getBuffer(reference);
        reference.imageData = await (0, sharp_1.default)(buffer).rotate(this.angle).toBuffer();
        return reference;
    }
    async negate(reference) {
        const buffer = await this.getBuffer(reference);
        reference.imageData = await (0, sharp_1.default)(buffer).rotate(this.angle).toBuffer();
        return reference;
    }
    async blur(reference) {
        const buffer = await this.getBuffer(reference);
        reference.imageData = await (0, sharp_1.default)(buffer).blur().toBuffer();
        return reference;
    }
    async sharpen(reference) {
        const buffer = await this.getBuffer(reference);
        reference.imageData = await (0, sharp_1.default)(buffer).sharpen().toBuffer();
        return reference;
    }
    async greyscale(reference) {
        const buffer = await this.getBuffer(reference);
        reference.imageData = await (0, sharp_1.default)(buffer).grayscale().toBuffer();
        return reference;
    }
}
exports.ReferenceRetrieverService = ReferenceRetrieverService;
//# sourceMappingURL=ReferenceRetrieverService.js.map