import { Interaction, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../SlashCommand";
import { CommandOptionChoice } from "../CommandOptionChoice";
import { PoseCommandType } from "./PoseCommandType";

export class PoseCommand extends SlashCommand {
    
    constructor(name : string, description : string, options : Array<CommandOptionChoice>) {
        super(name, description, PoseCommandType.pose, options);
    }

    public async execute(interaction : any): Promise<void> {
        await interaction.reply('Pose retrieved!')
    }

}