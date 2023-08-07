"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaceCommand = void 0;
const CommandType_1 = require("../CommandType");
const ReferenceCommand_1 = require("../ReferenceCommand");
class FaceCommand extends ReferenceCommand_1.ReferenceCommand {
    constructor(name, description, choices) {
        super(name, description, choices, CommandType_1.CommandType.Quickpose);
    }
}
exports.FaceCommand = FaceCommand;
//# sourceMappingURL=FaceCommand.js.map