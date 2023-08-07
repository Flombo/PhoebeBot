"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickPoseMessageBuilder = void 0;
const discord_js_1 = require("discord.js");
const ReferenceMessageBuilder_1 = require("./ReferenceMessageBuilder");
class QuickPoseMessageBuilder extends ReferenceMessageBuilder_1.ReferenceMessageBuilder {
    buildTransformedReferenceMessage(reference, attachmentName) {
        const embedBuilder = new discord_js_1.EmbedBuilder();
        embedBuilder.setColor(0x0099FF)
            .setTitle('Transformed: Reference pose')
            .setDescription("Reference retrieved from Quickposes. All rights reserve to them.")
            .addFields({ name: 'Reference image', value: reference.url }, { name: 'Reference source', value: "https://quickposes.com/random" }, { name: 'Owner', value: reference.owner }, { name: 'Height', value: reference.height.toString() }, { name: 'Width', value: reference.width.toString() })
            .setImage(`attachment://${attachmentName}`)
            .setFooter({ text: "Copyright: Quickposes", iconURL: "https://quickposes.com/apple-touch-icon.png" })
            .setTimestamp();
        return embedBuilder;
    }
    buildReferenceMessage(reference) {
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
exports.QuickPoseMessageBuilder = QuickPoseMessageBuilder;
//# sourceMappingURL=QuickPoseMessageBuilder.js.map