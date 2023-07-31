import { CommandOptionChoice } from "../CommandOptionChoice";
import { CommandType } from "../CommandType";
import { SlashCommand } from "../SlashCommand";
import { PoseCommandType } from "./PoseCommandType";

export class LandscapeCommand extends SlashCommand {

    constructor(name : string, description : string, options : Array<CommandOptionChoice>) {
        super(name, description, PoseCommandType.landscapes, options, CommandType.Quickpose);
    }

}