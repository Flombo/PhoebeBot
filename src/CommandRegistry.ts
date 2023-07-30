import { ICommand } from "./commands/ICommand";
import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from "discord.js";

export class CommandRegistry {

    /**
     * Registers the built commands in Discord for further usage.
     * @param commands 
     * @param clientId 
     * @param token 
     */
    public static async registerCommands(commands : Map<string, ICommand>, clientId : string | undefined, token : string | undefined) : Promise<void> {
        
        if(token === undefined || clientId === undefined) {
            throw new Error("Token or clientId undefined");
        }
        
        const commandDataJSON : Array<RESTPostAPIChatInputApplicationCommandsJSONBody> = new Array();
        try {
            commands.forEach((value : ICommand) => commandDataJSON.push(value.data.toJSON()));
            const rest : REST = new REST();
            rest.setToken(token),
            console.log(`Started refreshing ${commandDataJSON.length} application (/) commands.`);
            await rest.put(
                Routes.applicationCommands(clientId),
                { body: commandDataJSON }
            );
    
            console.log(`Successfully reloaded ${commandDataJSON.length} application (/) commands.`);
        } catch (error : any) {
            console.log(error);
        }
    }

}