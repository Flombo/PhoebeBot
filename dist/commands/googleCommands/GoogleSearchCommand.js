"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleSearchCommand = void 0;
const CommandType_1 = require("../CommandType");
const ReferenceCommand_1 = require("../ReferenceCommand");
class GoogleSearchCommand extends ReferenceCommand_1.ReferenceCommand {
    constructor(name, description, options, referenceButtonsFiles) {
        super(name, description, options, CommandType_1.CommandType.Google, referenceButtonsFiles);
    }
}
exports.GoogleSearchCommand = GoogleSearchCommand;
//# sourceMappingURL=GoogleSearchCommand.js.map