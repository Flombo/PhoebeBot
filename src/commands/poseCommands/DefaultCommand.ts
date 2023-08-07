import { CommandOptionChoice } from "../CommandOptionChoice";
import { CommandType } from "../CommandType";
import { ReferenceCommand } from "../ReferenceCommand";

export class DefaultCommand extends ReferenceCommand {

    constructor() {
        super("", "", new Array<CommandOptionChoice>(), CommandType.DefaultCommand);
    }

}