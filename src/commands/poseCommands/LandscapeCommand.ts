import { CommandOptionChoice } from "../CommandOptionChoice";
import { PoseCommandType } from "./PoseCommandType";
import { SlashCommand } from "../SlashCommand";
import { CommandType } from "../CommandType";

export class LandscapeCommand extends SlashCommand {

    constructor(name : string, description : string, options : Array<CommandOptionChoice>) {
        super(name, description, PoseCommandType.landscapes, options, CommandType.Quickpose);
    }

}