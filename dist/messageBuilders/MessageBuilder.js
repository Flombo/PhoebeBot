"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageBuilder = void 0;
const discord_js_1 = require("discord.js");
class MessageBuilder {
    buildReferenceMessage(reference) {
        throw new Error("Method not implemented. Retrieved reference: " + reference);
    }
    buildImageAttachment(buffer) {
        const attachementBuilder = new discord_js_1.AttachmentBuilder(buffer);
        return attachementBuilder;
    }
}
exports.MessageBuilder = MessageBuilder;
//# sourceMappingURL=MessageBuilder.js.map