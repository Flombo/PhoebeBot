"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const dotenv_1 = require("dotenv");
const path_1 = tslib_1.__importDefault(require("path"));
const CommandBuilder_1 = require("./CommandBuilder");
const CommandRegistry_1 = require("./CommandRegistry");
const ComponentFilesHelper_1 = require("./ComponentFilesHelper");
const ButtonEventHandler_1 = require("./handler/ButtonEventHandler");
const CommandEventHandler_1 = require("./handler/CommandEventHandler");
(0, dotenv_1.config)();
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
const commandBuilder = new CommandBuilder_1.CommandBuilder();
let commandEventHandler;
let buttonEventHandler;
const componentFilesHelper = new ComponentFilesHelper_1.ComponentFilesHelper();
client.once(discord_js_1.Events.ClientReady, event => {
    console.log(`Ready! Logged in as ${event.user.tag}`);
    componentFilesHelper.findJSONComponentFiles(path_1.default.join(__dirname, 'referenceButtons/referenceButtonJSON'));
    commandBuilder.buildCommands(componentFilesHelper.componentFiles);
    CommandRegistry_1.CommandRegistry.registerCommands(commandBuilder.commands, process.env.CLIENT_ID, process.env.BOTTOKEN);
    commandEventHandler = new CommandEventHandler_1.CommandEventHandler(commandBuilder.commands);
    buttonEventHandler = new ButtonEventHandler_1.ButtonEventHandler(componentFilesHelper.componentFiles);
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
