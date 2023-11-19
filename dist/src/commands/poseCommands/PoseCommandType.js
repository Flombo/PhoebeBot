"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoseCommandType = void 0;
var PoseCommandType;
(function (PoseCommandType) {
    PoseCommandType[PoseCommandType["pose"] = 0] = "pose";
    PoseCommandType[PoseCommandType["urban"] = 1] = "urban";
    PoseCommandType[PoseCommandType["face"] = 2] = "face";
    PoseCommandType[PoseCommandType["animals"] = 3] = "animals";
    PoseCommandType[PoseCommandType["landscapes"] = 4] = "landscapes";
    PoseCommandType[PoseCommandType["hands"] = 5] = "hands";
    PoseCommandType[PoseCommandType["default"] = 6] = "default";
})(PoseCommandType || (exports.PoseCommandType = PoseCommandType = {}));
