"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandCommand = void 0;
const CommandType_1 = require("../CommandType");
const ReferenceCommand_1 = require("../ReferenceCommand");
class HandCommand extends ReferenceCommand_1.ReferenceCommand {
    constructor(name, description, options, referenceButtonsFiles) {
        super(name, description, options, CommandType_1.CommandType.Quickpose, referenceButtonsFiles);
    }
}
exports.HandCommand = HandCommand;
