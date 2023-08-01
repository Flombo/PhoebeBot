import sharp from "sharp";
import { ICommand } from "../commands/ICommand";
import { IReference } from "./IReference";
import { IReferenceRetrieverService } from "./IReferenceRetrieverService";

export abstract class ReferenceRetrieverService implements IReferenceRetrieverService {
    
    getReference(command: ICommand): Promise<IReference> {
        throw new Error("Method not implemented. Used command: " + command);
    }

    public async mirrorHorizontal(reference: IReference): Promise<IReference> {
        reference.imageData = await sharp(reference.url).flop().toBuffer();
        return reference;
    }

    public async mirrorVertical(reference: IReference): Promise<IReference> {
        reference.imageData = await sharp(reference.url).flip().toBuffer();
        return reference;
    }

    public async rotateClockwise(reference: IReference): Promise<IReference> {
        reference.imageData = await sharp(reference.url).rotate().toBuffer();
        return reference;
    }

    public async rotateCounterClockwise(reference: IReference): Promise<IReference> {
        reference.imageData = await sharp(reference.url).rotate().toBuffer();
        return reference;
    }

}