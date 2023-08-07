import { CommandOptionChoice } from "../CommandOptionChoice";
import { CommandType } from "../CommandType";
import { ReferenceCommand } from "../ReferenceCommand";

export class FaceCommand extends ReferenceCommand {

    constructor(name: string, description: string, choices: Array<CommandOptionChoice>) {
        super(name, description, choices, CommandType.Quickpose);
    }

}