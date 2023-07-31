import { ICommand } from "../commands/ICommand";
import { IReference } from "./IReference";

export interface IReferenceRetrieverService {

    getReference(command : ICommand) : Promise<IReference>;

    mirrorHorizontal(reference : IReference) : IReference;

    mirrorVertical(reference : IReference) : IReference;

    rotateClockwise(reference : IReference) : IReference;

    rotateCounterClockwise(reference : IReference) : IReference;

}