import { CommandOptionChoice } from "../CommandOptionChoice";
import { PoseCommandType } from "./PoseCommandType";
import { SlashCommand } from "../SlashCommand";

export class FaceCommand extends SlashCommand {

    constructor(name : string, description : string, choices : Array<CommandOptionChoice>) {
        super(name, description, PoseCommandType.face, choices);
    }

    public async execute(interaction: any): Promise<void> {
        return await interaction.reply('face reference retrieved!');
    }

}