"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpCommand = void 0;
const SlashCommand_1 = require("./SlashCommand");
class HelpCommand extends SlashCommand_1.SlashCommand {
    messageBuilder;
    constructor(name, description, options) {
        super(name, description, options);
    }
    async execute(interaction, commands) {
    }
}
exports.HelpCommand = HelpCommand;
//# sourceMappingURL=HelpCommand.js.map