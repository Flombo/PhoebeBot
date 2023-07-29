"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
client.once(discord_js_1.Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});
client.login(process.env.BOTTOKEN).then(() => console.log('Bot logged in!'));
//# sourceMappingURL=bot.js.map