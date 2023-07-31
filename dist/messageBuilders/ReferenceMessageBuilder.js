"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceMessageBuilder = void 0;
const discord_js_1 = require("discord.js");
class ReferenceMessageBuilder {
    buildReferenceMessage(reference) {
        const embedBuilder = new discord_js_1.EmbedBuilder();
        embedBuilder.setColor(0x0099FF)
            .setTitle('Reference pose')
            .setDescription("Reference retrieved from Quickposes. All rights reserve to them.")
            .addFields({ name: 'Reference image', value: reference.url }, { name: 'Reference source', value: reference.url }, { name: 'Owner', value: reference.owner })
            .setImage(reference.url)
            .setFooter({ text: "Copyright:", iconURL: "https://quickposes.com/apple-touch-icon.png" })
            .setTimestamp();
        return embedBuilder;
    }
}
exports.ReferenceMessageBuilder = ReferenceMessageBuilder;
//# sourceMappingURL=ReferenceMessageBuilder.js.map