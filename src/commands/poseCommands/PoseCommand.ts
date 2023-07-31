import { SlashCommand } from "../SlashCommand";
import { CommandOptionChoice } from "../CommandOptionChoice";
import { PoseCommandType } from "./PoseCommandType";
import { CommandType } from "../CommandType";

export class PoseCommand extends SlashCommand {

    constructor(name : string, description : string, options : Array<CommandOptionChoice>) {
        super(name, description, PoseCommandType.pose, options, CommandType.Quickpose);
    }

}