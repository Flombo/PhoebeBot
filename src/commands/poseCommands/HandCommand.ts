import { CommandOptionChoice } from "../CommandOptionChoice";
import { PoseCommandType } from "./PoseCommandType";
import { SlashCommand } from "../SlashCommand";

export class HandCommand extends SlashCommand {

    constructor(name : string, description : string, options : Array<CommandOptionChoice>) {
        super(name, description, PoseCommandType.hands, options);
    }

    public async execute(interaction: any): Promise<void> {
        return await interaction.reply('hand reference retrieved!');
    }

}