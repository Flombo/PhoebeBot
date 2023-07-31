import { CommandOptionChoice } from "../CommandOptionChoice";
import { CommandType } from "../CommandType";
import { SlashCommand } from "../SlashCommand";
import { PoseCommandType } from "./PoseCommandType";

export class UrbanCommand extends SlashCommand {

    constructor(name : string, description : string, options : Array<CommandOptionChoice>) {
        super(name, description, PoseCommandType.urban, options, CommandType.Quickpose);
    }

}