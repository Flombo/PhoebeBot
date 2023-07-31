import { CommandOptionChoice } from "../CommandOptionChoice";
import { PoseCommandType } from "./PoseCommandType";
import { SlashCommand } from "../SlashCommand";
import { EmbedBuilder, InteractionResponse } from "discord.js";
import { CommandType } from "../CommandType";

export class UrbanCommand extends SlashCommand {

    constructor(name : string, description : string, options : Array<CommandOptionChoice>) {
        super(name, description, PoseCommandType.urban, options, CommandType.Quickpose);
    }

}