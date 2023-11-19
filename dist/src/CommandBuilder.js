"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandBuilder = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const ComponentFilesHelper_1 = require("./ComponentFilesHelper");
const GoogleCommandType_1 = require("./commands/googleCommands/GoogleCommandType");
const GoogleImageSearchCommand_1 = require("./commands/googleCommands/GoogleImageSearchCommand");
const AnimalCommand_1 = require("./commands/poseCommands/AnimalCommand");
const DefaultCommand_1 = require("./commands/poseCommands/DefaultCommand");
const FaceCommand_1 = require("./commands/poseCommands/FaceCommand");
const HandCommand_1 = require("./commands/poseCommands/HandCommand");
const LandscapeCommand_1 = require("./commands/poseCommands/LandscapeCommand");
const PoseCommand_1 = require("./commands/poseCommands/PoseCommand");
const PoseCommandType_1 = require("./commands/poseCommands/PoseCommandType");
const UrbanCommand_1 = require("./commands/poseCommands/UrbanCommand");
class CommandBuilder {
    _commands = new Map();
    commandsPath = path_1.default.join(__dirname, 'commands/commandJSON');
    buildCommands(referenceButtonsFiles) {
        try {
            const componentFilesHelper = new ComponentFilesHelper_1.ComponentFilesHelper();
            componentFilesHelper.findJSONComponentFiles(this.commandsPath);
            const commandFiles = componentFilesHelper.componentFiles;
            commandFiles.forEach(commandFile => {
                const command = Object.assign(new DefaultCommand_1.DefaultCommand(new Array()), require(commandFile));
                switch (command.name) {
                    case PoseCommandType_1.PoseCommandType[PoseCommandType_1.PoseCommandType.pose]:
                        const poseCommand = new PoseCommand_1.PoseCommand(command.name, command.description, command.options, referenceButtonsFiles);
                        poseCommand.initSlashCommand();
                        this._commands.set(command.name, poseCommand);
                        break;
                    case PoseCommandType_1.PoseCommandType[PoseCommandType_1.PoseCommandType.animals]:
                        const animalCommand = new AnimalCommand_1.AnimalCommand(command.name, command.description, command.options, referenceButtonsFiles);
                        animalCommand.initSlashCommand();
                        this._commands.set(command.name, animalCommand);
                        break;
                    case PoseCommandType_1.PoseCommandType[PoseCommandType_1.PoseCommandType.face]:
                        const faceCommand = new FaceCommand_1.FaceCommand(command.name, command.description, command.options, referenceButtonsFiles);
                        faceCommand.initSlashCommand();
                        this._commands.set(command.name, faceCommand);
                        break;
                    case PoseCommandType_1.PoseCommandType[PoseCommandType_1.PoseCommandType.hands]:
                        const handCommand = new HandCommand_1.HandCommand(command.name, command.description, command.options, referenceButtonsFiles);
                        handCommand.initSlashCommand();
                        this._commands.set(command.name, handCommand);
                        break;
                    case PoseCommandType_1.PoseCommandType[PoseCommandType_1.PoseCommandType.urban]:
                        const urbanCommand = new UrbanCommand_1.UrbanCommand(command.name, command.description, command.options, referenceButtonsFiles);
                        urbanCommand.initSlashCommand();
                        this._commands.set(command.name, urbanCommand);
                        break;
                    case PoseCommandType_1.PoseCommandType[PoseCommandType_1.PoseCommandType.landscapes]:
                        const landscapeCommand = new LandscapeCommand_1.LandscapeCommand(command.name, command.description, command.options, referenceButtonsFiles);
                        landscapeCommand.initSlashCommand();
                        this._commands.set(command.name, landscapeCommand);
                        break;
                    case GoogleCommandType_1.GoogleCommandType[GoogleCommandType_1.GoogleCommandType.googleimagesearch]:
                        const googleImageSearch = new GoogleImageSearchCommand_1.GoogleImageSearchCommand(command.name, command.description, command.options, referenceButtonsFiles);
                        googleImageSearch.initSlashCommand();
                        this._commands.set(command.name, googleImageSearch);
                        break;
                }
            });
        }
        catch (exception) {
            console.log(exception);
        }
    }
    get commands() {
        return this._commands;
    }
}
exports.CommandBuilder = CommandBuilder;
