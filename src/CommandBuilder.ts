import path from "path";
import { ICommand } from "./commands/ICommand";
import * as fs from 'fs';
import { DefaultCommand } from "./commands/poseCommands/DefaultCommand";
import { PoseCommandType } from "./commands/poseCommands/PoseCommandType";
import { PoseCommand } from "./commands/poseCommands/PoseCommand";
import { AnimalCommand } from "./commands/poseCommands/AnimalCommand";
import { FaceCommand } from "./commands/poseCommands/FaceCommand";
import { HandCommand } from "./commands/poseCommands/HandCommand";
import { UrbanCommand } from "./commands/poseCommands/UrbanCommand";
import { LandscapeCommand } from "./commands/poseCommands/LandscapeCommand";

export class CommandBuilder {

    private _commands: Map<string, ICommand> = new Map();

    private commandsPath = path.join(__dirname, 'commands/commandJSON');

    private commandFiles : Array<string> = new Array();

    /**
     * Builds all available slash commands from json files. 
     */
    public buildCommands() {
        try {
            this.findJSONCommandFiles(this.commandsPath);
            this.commandFiles.forEach(commandFile => {
	            const command : ICommand = Object.assign(new DefaultCommand(), require(commandFile));

                switch(command.name) {
                    case PoseCommandType[PoseCommandType.pose]:
                        const poseCommand : PoseCommand = new PoseCommand(command.name, command.description, command.options);
                        poseCommand.initSlashCommand();
                        this._commands.set(command.name, poseCommand);
                        break;
                    case PoseCommandType[PoseCommandType.animals]:
                        const animalCommand : AnimalCommand = new AnimalCommand(command.name, command.description, command.options);
                        animalCommand.initSlashCommand();
                        this._commands.set(command.name, animalCommand);
                        break;
                    case PoseCommandType[PoseCommandType.face]:
                        const faceCommand : FaceCommand = new FaceCommand(command.name, command.description, command.options);
                        faceCommand.initSlashCommand();
                        this._commands.set(command.name, faceCommand);
                        break;
                    case PoseCommandType[PoseCommandType.hands]:
                        const handCommand : HandCommand = new HandCommand(command.name, command.description, command.options);
                        handCommand.initSlashCommand();
                        this._commands.set(command.name, handCommand);
                        break;
                    case PoseCommandType[PoseCommandType.urban]:
                        const urbanCommand : UrbanCommand = new UrbanCommand(command.name, command.description, command.options);
                        urbanCommand.initSlashCommand();
                        this._commands.set(command.name, urbanCommand);
                        break;
                    case PoseCommandType[PoseCommandType.landscapes]:
                        const landscapeCommand : LandscapeCommand = new LandscapeCommand(command.name, command.description, command.options);
                        landscapeCommand.initSlashCommand();
                        this._commands.set(command.name, landscapeCommand);
                        break;
                }

            });
            this.commandFiles = [];
        } catch(exception) {
            console.log(exception);
        }
    }

    /**
     * Recursive command json retrieval.
     * @param filePath 
     */
    private findJSONCommandFiles(filePath : string) : void {
        const filesInDirectory = fs.readdirSync(filePath);

        filesInDirectory.forEach(file => {
            const absolutePath = path.join(filePath, file);

            if (fs.statSync(absolutePath).isDirectory()) {
                this.findJSONCommandFiles(absolutePath);
            } else {
                if(file.includes('.json')) {
                    this.commandFiles.push(absolutePath);
                }
            }
        });
    }

    public get commands(): Map<string, ICommand> {
        return this._commands;
    }

}