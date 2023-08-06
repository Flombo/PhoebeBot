import { BaseInteraction } from "discord.js";

export interface IDiscordEventHandler {

    handle(interaction: BaseInteraction): Promise<void>;

}