"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoseCommand = void 0;
const SlashCommand_1 = require("../SlashCommand");
const PoseCommandType_1 = require("./PoseCommandType");
class PoseCommand extends SlashCommand_1.SlashCommand {
    constructor(name, description, options) {
        super(name, description, PoseCommandType_1.PoseCommandType.pose, options);
    }
    async execute(interaction) {
        await interaction.reply('Pose retrieved!');
    }
}
exports.PoseCommand = PoseCommand;
//# sourceMappingURL=PoseCommand.js.map