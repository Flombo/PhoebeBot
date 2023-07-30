"use strict";
exports.__esModule = true;
// Require the necessary discord.js classes
var discord_js_1 = require("discord.js");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// Create a new client instance
var client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(discord_js_1.Events.ClientReady, function (c) {
    console.log("Ready! Logged in as ".concat(c.user.tag));
});
// Log in to Discord with your client's token
client.login(process.env.BOTTOKEN).then(function () { return console.log('Bot logged in!'); });
