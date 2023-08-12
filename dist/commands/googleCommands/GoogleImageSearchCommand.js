"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleImageSearchCommand = void 0;
const CommandType_1 = require("../CommandType");
const ReferenceCommand_1 = require("../ReferenceCommand");
class GoogleImageSearchCommand extends ReferenceCommand_1.ReferenceCommand {
    constructor(name, description, options, referenceButtonsFiles) {
        super(name, description, options, CommandType_1.CommandType.Google, referenceButtonsFiles);
    }
}
exports.GoogleImageSearchCommand = GoogleImageSearchCommand;
//# sourceMappingURL=GoogleImageSearchCommand.js.map