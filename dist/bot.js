"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = require("dotenv");
const CommandBuilder_1 = require("./CommandBuilder");
const CommandRegistry_1 = require("./CommandRegistry");
const ButtonEventHandler_1 = require("./handler/ButtonEventHandler");
const CommandEventHandler_1 = require("./handler/CommandEventHandler");
(0, dotenv_1.config)();
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
const commandBuilder = new CommandBuilder_1.CommandBuilder();
let commandEventHandler;
let buttonEventHandler;
client.once(discord_js_1.Events.ClientReady, event => {
    console.log(`Ready! Logged in as ${event.user.tag}`);
    commandBuilder.buildCommands();
    CommandRegistry_1.CommandRegistry.registerCommands(commandBuilder.commands, process.env.CLIENT_ID, process.env.BOTTOKEN);
    commandEventHandler = new CommandEventHandler_1.CommandEventHandler(commandBuilder.commands);
    buttonEventHandler = new ButtonEventHandler_1.ButtonEventHandler();
});
client.on(discord_js_1.Events.InteractionCreate, async (interaction) => {
    if (interaction.isChatInputCommand()) {
        await commandEventHandler.handle(interaction);
    }
    else if (interaction.isButton()) {
        await buttonEventHandler.handle(interaction);
    }
});
client.login(process.env.BOTTOKEN).then(() => console.log('Bot logged in!'));
//# sourceMappingURL=bot.js.map