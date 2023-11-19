"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandRegistry = void 0;
const discord_js_1 = require("discord.js");
class CommandRegistry {
    static async registerCommands(commands, clientId, token) {
        if (token === undefined || clientId === undefined) {
            throw new Error("Token or clientId undefined");
        }
        const commandDataJSON = new Array();
        try {
            commands.forEach((value) => commandDataJSON.push(value.data.toJSON()));
            const rest = new discord_js_1.REST();
            rest.setToken(token);
            console.log(`Started refreshing ${commandDataJSON.length} application (/) commands.`);
            await rest.put(discord_js_1.Routes.applicationCommands(clientId), { body: commandDataJSON });
            console.log(`Successfully reloaded ${commandDataJSON.length} application (/) commands.`);
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.CommandRegistry = CommandRegistry;
