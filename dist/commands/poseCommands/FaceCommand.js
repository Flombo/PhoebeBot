"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaceCommand = void 0;
const CommandType_1 = require("../CommandType");
const SlashCommand_1 = require("../SlashCommand");
const PoseCommandType_1 = require("./PoseCommandType");
class FaceCommand extends SlashCommand_1.SlashCommand {
    constructor(name, description, choices) {
        super(name, description, PoseCommandType_1.PoseCommandType.face, choices, CommandType_1.CommandType.Quickpose);
    }
}
exports.FaceCommand = FaceCommand;
//# sourceMappingURL=FaceCommand.js.map