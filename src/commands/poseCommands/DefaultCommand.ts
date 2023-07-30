import { CommandOptionChoice } from "../CommandOptionChoice";
import { PoseCommandType } from "./PoseCommandType";
import { SlashCommand } from "../SlashCommand";

export class DefaultCommand extends SlashCommand {

    constructor() {
        super("","", PoseCommandType.default, new Array<CommandOptionChoice>());
    }

}