"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaceCommand = void 0;
const PoseCommandType_1 = require("./PoseCommandType");
const SlashCommand_1 = require("../SlashCommand");
const CommandType_1 = require("../CommandType");
class FaceCommand extends SlashCommand_1.SlashCommand {
    constructor(name, description, choices) {
        super(name, description, PoseCommandType_1.PoseCommandType.face, choices, CommandType_1.CommandType.Quickpose);
    }
}
exports.FaceCommand = FaceCommand;
//# sourceMappingURL=FaceCommand.js.map