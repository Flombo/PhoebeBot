import { CommandOptionChoice } from "../CommandOptionChoice";
import { CommandType } from "../CommandType";
import { SlashCommand } from "../SlashCommand";
import { PoseCommandType } from "./PoseCommandType";

export class DefaultCommand extends SlashCommand {

    constructor() {
        super("","", PoseCommandType.default, new Array<CommandOptionChoice>(), CommandType.DefaultCommand);
    }

}