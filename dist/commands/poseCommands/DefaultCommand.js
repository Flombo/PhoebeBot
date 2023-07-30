"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultCommand = void 0;
const PoseCommandType_1 = require("./PoseCommandType");
const SlashCommand_1 = require("../SlashCommand");
class DefaultCommand extends SlashCommand_1.SlashCommand {
    constructor() {
        super("", "", PoseCommandType_1.PoseCommandType.default, new Array());
    }
}
exports.DefaultCommand = DefaultCommand;
//# sourceMappingURL=DefaultCommand.js.map