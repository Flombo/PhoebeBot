import { CommandOptionChoice } from "../CommandOptionChoice";
import { PoseCommandType } from "./PoseCommandType";
import { SlashCommand } from "../SlashCommand";

export class LandscapeCommand extends SlashCommand {

    constructor(name : string, description : string, options : Array<CommandOptionChoice>) {
        super(name, description, PoseCommandType.landscapes, options);
    }

    public async execute(interaction: any): Promise<void> {
        return await interaction.reply('landscape reference retrieved!');
    }

}