"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalCommand = void 0;
const CommandType_1 = require("../CommandType");
const ReferenceCommand_1 = require("../ReferenceCommand");
class AnimalCommand extends ReferenceCommand_1.ReferenceCommand {
    constructor(name, description, options) {
        super(name, description, options, CommandType_1.CommandType.Quickpose);
    }
}
exports.AnimalCommand = AnimalCommand;
//# sourceMappingURL=AnimalCommand.js.map