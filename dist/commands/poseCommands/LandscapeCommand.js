"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandscapeCommand = void 0;
const PoseCommandType_1 = require("./PoseCommandType");
const SlashCommand_1 = require("../SlashCommand");
class LandscapeCommand extends SlashCommand_1.SlashCommand {
    constructor(name, description, options) {
        super(name, description, PoseCommandType_1.PoseCommandType.landscapes, options);
    }
    async execute(interaction) {
        return await interaction.reply('landscape reference retrieved!');
    }
}
exports.LandscapeCommand = LandscapeCommand;
//# sourceMappingURL=LandscapeCommand.js.map