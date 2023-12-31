import { CommandOptionChoice } from "../CommandOptionChoice";
import { CommandType } from "../CommandType";
import { ReferenceCommand } from "../ReferenceCommand";

export class UrbanCommand extends ReferenceCommand {

    constructor(name: string, description: string, options: Array<CommandOptionChoice>, referenceButtonsFiles: Array<string>) {
        super(name, description, options, CommandType.Quickpose, referenceButtonsFiles);
    }

}