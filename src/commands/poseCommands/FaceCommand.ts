import { CommandOptionChoice } from "../CommandOptionChoice";
import { PoseCommandType } from "./PoseCommandType";
import { SlashCommand } from "../SlashCommand";
import { CommandType } from "../CommandType";

export class FaceCommand extends SlashCommand {

    constructor(name : string, description : string, choices : Array<CommandOptionChoice>) {
        super(name, description, PoseCommandType.face, choices, CommandType.Quickpose);
    }

}