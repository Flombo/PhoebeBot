import { Interaction, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "./SlashCommand";
import { CommandOptionChoice } from "./CommandOptionChoice";

export class PoseCommand extends SlashCommand {
    
    constructor(name : string, description : string, choices : Array<CommandOptionChoice>) {
        super(name, description, choices);
    }

    //ToDo: override execute

}