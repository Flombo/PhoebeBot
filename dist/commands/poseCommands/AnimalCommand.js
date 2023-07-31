"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalCommand = void 0;
const CommandType_1 = require("../CommandType");
const SlashCommand_1 = require("../SlashCommand");
const PoseCommandType_1 = require("./PoseCommandType");
class AnimalCommand extends SlashCommand_1.SlashCommand {
    constructor(name, description, options) {
        super(name, description, PoseCommandType_1.PoseCommandType.animals, options, CommandType_1.CommandType.Quickpose);
    }
}
exports.AnimalCommand = AnimalCommand;
//# sourceMappingURL=AnimalCommand.js.map