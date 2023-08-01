"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceRetrieverService = void 0;
const tslib_1 = require("tslib");
const sharp_1 = tslib_1.__importDefault(require("sharp"));
class ReferenceRetrieverService {
    getReference(command) {
        throw new Error("Method not implemented. Used command: " + command);
    }
    async mirrorHorizontal(reference) {
        reference.imageData = await (0, sharp_1.default)(reference.url).flop().toBuffer();
        return reference;
    }
    async mirrorVertical(reference) {
        reference.imageData = await (0, sharp_1.default)(reference.url).flip().toBuffer();
        return reference;
    }
    async rotateClockwise(reference) {
        reference.imageData = await (0, sharp_1.default)(reference.url).rotate().toBuffer();
        return reference;
    }
    async rotateCounterClockwise(reference) {
        reference.imageData = await (0, sharp_1.default)(reference.url).rotate().toBuffer();
        return reference;
    }
}
exports.ReferenceRetrieverService = ReferenceRetrieverService;
//# sourceMappingURL=ReferenceRetrieverService.js.map