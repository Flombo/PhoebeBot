"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrbanCommand = void 0;
const PoseCommandType_1 = require("./PoseCommandType");
const SlashCommand_1 = require("../SlashCommand");
const CommandType_1 = require("../CommandType");
class UrbanCommand extends SlashCommand_1.SlashCommand {
    constructor(name, description, options) {
        super(name, description, PoseCommandType_1.PoseCommandType.urban, options, CommandType_1.CommandType.Quickpose);
    }
}
exports.UrbanCommand = UrbanCommand;
//# sourceMappingURL=UrbanCommand.js.map