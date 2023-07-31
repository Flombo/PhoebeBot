"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultCommand = void 0;
const CommandType_1 = require("../CommandType");
const SlashCommand_1 = require("../SlashCommand");
const PoseCommandType_1 = require("./PoseCommandType");
class DefaultCommand extends SlashCommand_1.SlashCommand {
    constructor() {
        super("", "", PoseCommandType_1.PoseCommandType.default, new Array(), CommandType_1.CommandType.DefaultCommand);
    }
}
exports.DefaultCommand = DefaultCommand;
//# sourceMappingURL=DefaultCommand.js.map