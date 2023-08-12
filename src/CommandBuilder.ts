import path from "path";
import { ComponentFilesHelper } from './ComponentFilesHelper';
import { IReferenceCommand } from "./commands/IReferenceCommand";
import { GoogleCommandType } from "./commands/googleCommands/GoogleCommandType";
import { GoogleImageSearchCommand } from "./commands/googleCommands/GoogleImageSearchCommand";
import { AnimalCommand } from "./commands/poseCommands/AnimalCommand";
import { DefaultCommand } from "./commands/poseCommands/DefaultCommand";
import { FaceCommand } from "./commands/poseCommands/FaceCommand";
import { HandCommand } from "./commands/poseCommands/HandCommand";
import { LandscapeCommand } from "./commands/poseCommands/LandscapeCommand";
import { PoseCommand } from "./commands/poseCommands/PoseCommand";
import { PoseCommandType } from "./commands/poseCommands/PoseCommandType";
import { UrbanCommand } from "./commands/poseCommands/UrbanCommand";

export class CommandBuilder {

    private _commands: Map<string, IReferenceCommand> = new Map();

    private commandsPath = path.join(__dirname, 'commands/commandJSON');

    /**
     * Builds all available slash commands from json files. 
     */
    public buildCommands(referenceButtonsFiles: Array<string>) {
        try {
            const componentFilesHelper: ComponentFilesHelper = new ComponentFilesHelper();
            componentFilesHelper.findJSONComponentFiles(this.commandsPath);
            const commandFiles: Array<string> = componentFilesHelper.componentFiles;

            commandFiles.forEach(commandFile => {
                const command: IReferenceCommand = Object.assign(new DefaultCommand(new Array()), require(commandFile));

                switch (command.name) {
                    case PoseCommandType[PoseCommandType.pose]:
                        const poseCommand: PoseCommand = new PoseCommand(command.name, command.description, command.options, referenceButtonsFiles);
                        poseCommand.initSlashCommand();
                        this._commands.set(command.name, poseCommand);
                        break;
                    case PoseCommandType[PoseCommandType.animals]:
                        const animalCommand: AnimalCommand = new AnimalCommand(command.name, command.description, command.options, referenceButtonsFiles);
                        animalCommand.initSlashCommand();
                        this._commands.set(command.name, animalCommand);
                        break;
                    case PoseCommandType[PoseCommandType.face]:
                        const faceCommand: FaceCommand = new FaceCommand(command.name, command.description, command.options, referenceButtonsFiles);
                        faceCommand.initSlashCommand();
                        this._commands.set(command.name, faceCommand);
                        break;
                    case PoseCommandType[PoseCommandType.hands]:
                        const handCommand: HandCommand = new HandCommand(command.name, command.description, command.options, referenceButtonsFiles);
                        handCommand.initSlashCommand();
                        this._commands.set(command.name, handCommand);
                        break;
                    case PoseCommandType[PoseCommandType.urban]:
                        const urbanCommand: UrbanCommand = new UrbanCommand(command.name, command.description, command.options, referenceButtonsFiles);
                        urbanCommand.initSlashCommand();
                        this._commands.set(command.name, urbanCommand);
                        break;
                    case PoseCommandType[PoseCommandType.landscapes]:
                        const landscapeCommand: LandscapeCommand = new LandscapeCommand(command.name, command.description, command.options, referenceButtonsFiles);
                        landscapeCommand.initSlashCommand();
                        this._commands.set(command.name, landscapeCommand);
                        break;
                    case GoogleCommandType[GoogleCommandType.googleimagesearch]:
                        const googleImageSearch: GoogleImageSearchCommand = new GoogleImageSearchCommand(command.name, command.description, command.options, referenceButtonsFiles);
                        googleImageSearch.initSlashCommand();
                        this._commands.set(command.name, googleImageSearch);
                        break;
                }

            });
        } catch (exception) {
            console.log(exception);
        }
    }

    public get commands(): Map<string, IReferenceCommand> {
        return this._commands;
    }

}