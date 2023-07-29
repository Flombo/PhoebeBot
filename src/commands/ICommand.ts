import { Interaction } from "discord.js";

export interface ICommand {
    execute(interaction : Interaction) : Promise<void>;
}