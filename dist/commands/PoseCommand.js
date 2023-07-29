"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoseCommand = void 0;
const SlashCommand_1 = require("./SlashCommand");
class PoseCommand extends SlashCommand_1.SlashCommand {
    constructor(name, description, choices) {
        super(name, description, choices);
    }
}
exports.PoseCommand = PoseCommand;
//# sourceMappingURL=PoseCommand.js.map