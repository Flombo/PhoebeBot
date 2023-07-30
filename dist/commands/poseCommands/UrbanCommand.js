"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrbanCommand = void 0;
const PoseCommandType_1 = require("./PoseCommandType");
const SlashCommand_1 = require("../SlashCommand");
class UrbanCommand extends SlashCommand_1.SlashCommand {
    constructor(name, description, options) {
        super(name, description, PoseCommandType_1.PoseCommandType.urban, options);
    }
    async execute(interaction) {
        return await interaction.reply('urban reference retrieved!');
    }
}
exports.UrbanCommand = UrbanCommand;
//# sourceMappingURL=UrbanCommand.js.map