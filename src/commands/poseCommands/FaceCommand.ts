import { CommandOptionChoice } from "../CommandOptionChoice";
import { CommandType } from "../CommandType";
import { SlashCommand } from "../SlashCommand";
import { PoseCommandType } from "./PoseCommandType";

export class FaceCommand extends SlashCommand {

    constructor(name : string, description : string, choices : Array<CommandOptionChoice>) {
        super(name, description, PoseCommandType.face, choices, CommandType.Quickpose);
    }

}