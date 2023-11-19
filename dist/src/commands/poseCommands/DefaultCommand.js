"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultCommand = void 0;
const CommandType_1 = require("../CommandType");
const ReferenceCommand_1 = require("../ReferenceCommand");
class DefaultCommand extends ReferenceCommand_1.ReferenceCommand {
    constructor(referenceButtonsFiles) {
        super("", "", new Array(), CommandType_1.CommandType.DefaultCommand, referenceButtonsFiles);
    }
}
exports.DefaultCommand = DefaultCommand;
