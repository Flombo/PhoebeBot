import { IReferenceCommand } from "../commands/IReferenceCommand";
import { IReference } from "./IReference";

export interface IReferenceRetrieverService {

    getReference(command: IReferenceCommand): Promise<IReference>;

    mirrorHorizontal(reference: IReference): Promise<IReference>;

    mirrorVertical(reference: IReference): Promise<IReference>;

    rotateClockwise(reference: IReference): Promise<IReference>;

    rotateCounterClockwise(reference: IReference): Promise<IReference>;

    negate(reference: IReference): Promise<IReference>;

    blur(reference: IReference): Promise<IReference>;

    sharpen(reference: IReference): Promise<IReference>;

    greyscale(reference: IReference): Promise<IReference>;

}