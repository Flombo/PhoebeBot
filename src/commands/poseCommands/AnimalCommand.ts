import { CommandOptionChoice } from "../CommandOptionChoice";
import { CommandType } from "../CommandType";
import { SlashCommand } from "../SlashCommand";
import { PoseCommandType } from "./PoseCommandType";

export class AnimalCommand extends SlashCommand {
    
    constructor(name : string, description : string, options : Array<CommandOptionChoice>) {
        super(name, description, PoseCommandType.animals, options, CommandType.Quickpose);
    }

}