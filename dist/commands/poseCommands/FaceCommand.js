"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaceCommand = void 0;
const PoseCommandType_1 = require("./PoseCommandType");
const SlashCommand_1 = require("../SlashCommand");
class FaceCommand extends SlashCommand_1.SlashCommand {
    constructor(name, description, choices) {
        super(name, description, PoseCommandType_1.PoseCommandType.face, choices);
    }
    async execute(interaction) {
        return await interaction.reply('face reference retrieved!');
    }
}
exports.FaceCommand = FaceCommand;
//# sourceMappingURL=FaceCommand.js.map