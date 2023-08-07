"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpMessageBuilder = void 0;
const discord_js_1 = require("discord.js");
class HelpMessageBuilder {
    buildHelpMessage(commands) {
        const embedBuilder = new discord_js_1.EmbedBuilder();
        embedBuilder.setColor(0x0099FF)
            .setTitle('Original: Reference pose')
            .setDescription("Reference retrieved from Quickposes. All rights reserve to them.")
            .addFields({ name: 'Reference image', value: reference.url }, { name: 'Reference source', value: "https://quickposes.com/random" }, { name: 'Owner', value: reference.owner }, { name: 'Height', value: reference.height.toString() }, { name: 'Width', value: reference.width.toString() })
            .setImage(reference.url)
            .setFooter({ text: "Copyright: Quickposes", iconURL: "https://quickposes.com/apple-touch-icon.png" })
            .setTimestamp();
        return embedBuilder;
    }
}
exports.HelpMessageBuilder = HelpMessageBuilder;
//# sourceMappingURL=HelpMessageBuilder.js.map