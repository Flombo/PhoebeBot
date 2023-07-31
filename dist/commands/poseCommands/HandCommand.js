"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandCommand = void 0;
const PoseCommandType_1 = require("./PoseCommandType");
const SlashCommand_1 = require("../SlashCommand");
const CommandType_1 = require("../CommandType");
class HandCommand extends SlashCommand_1.SlashCommand {
    constructor(name, description, options) {
        super(name, description, PoseCommandType_1.PoseCommandType.hands, options, CommandType_1.CommandType.Quickpose);
    }
}
exports.HandCommand = HandCommand;
//# sourceMappingURL=HandCommand.js.map