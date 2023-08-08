import { CommandOptionChoice } from "../CommandOptionChoice";
import { CommandType } from "../CommandType";
import { ReferenceCommand } from "../ReferenceCommand";

export class DefaultCommand extends ReferenceCommand {

    constructor(referenceButtonsFiles: Array<string>) {
        super("", "", new Array<CommandOptionChoice>(), CommandType.DefaultCommand, referenceButtonsFiles);
    }

}