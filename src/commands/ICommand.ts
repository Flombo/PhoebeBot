import { Interaction, SlashCommandBuilder } from "discord.js";
import { CommandOptionChoice } from "./CommandOptionChoice";
import { PoseCommandType } from "./poseCommands/PoseCommandType";

export interface ICommand {

    initSlashCommand() : void;

    execute(interaction : Interaction) : Promise<void>;

    get options() : Array<CommandOptionChoice>;

    set options(value : Array<CommandOptionChoice>);
    
    get type() : PoseCommandType;

    set type(value : PoseCommandType);

    get description() : string;

    set description(value : string);
    
    get name() : string;

    set name(value : string);

    get data() : SlashCommandBuilder;
    
}