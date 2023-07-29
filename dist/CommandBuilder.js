"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandBuilder = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs = tslib_1.__importStar(require("fs"));
class CommandBuilder {
    _commands;
    commandsPath = path_1.default.join(__dirname, 'commands');
    buildCommands() {
        try {
            const commandFiles = fs.readdirSync(this.commandsPath).filter(file => file.endsWith('.json'));
            commandFiles.forEach(commandFile => {
                const filePath = path_1.default.join(this.commandsPath, commandFile);
                const command = require(filePath);
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
//# sourceMappingURL=CommandBuilder.js.map