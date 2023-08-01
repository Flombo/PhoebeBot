import { ICommand } from "../commands/ICommand";
import { IReference } from "./IReference";

export interface IReferenceRetrieverService {

    getReference(command : ICommand) : Promise<IReference>;

    mirrorHorizontal(reference : IReference) : Promise<IReference>;

    mirrorVertical(reference : IReference) : Promise<IReference>;

    rotateClockwise(reference : IReference) : Promise<IReference>;

    rotateCounterClockwise(reference : IReference) : Promise<IReference>;

}