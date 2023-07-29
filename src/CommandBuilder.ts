import path from "path";
import { ICommand } from "./commands/ICommand";
import { File } from "buffer";
import * as fs from 'fs';

export class CommandBuilder {

    private _commands: Array<ICommand>;

    private commandsPath = path.join(__dirname, 'commands');
    

    public buildCommands() {
        try {
            const commandFiles = fs.readdirSync(this.commandsPath).filter(file=> file.endsWith('.json'));
            commandFiles.forEach(commandFile => {
                const filePath = path.join(this.commandsPath, commandFile);
	            const command : JSON = require(filePath);

            });
        } catch(exception) {
            console.log(exception);
        }
    }

    public get commands(): Array<ICommand> {
        return this._commands;
    }

}