import { ICommand } from "../commands/ICommand";
import { IReference } from "./IReference";
import { IReferenceRetrieverService } from "./IReferenceRetrieverService";

export class DeviantArtReferenceRetrieverService implements IReferenceRetrieverService {
    
    getReference(command: ICommand): Promise<IReference> {
        command.name
        throw new Error("Method not implemented.");
    }

    mirrorHorizontal(reference: IReference): IReference {
        reference.height;
        throw new Error("Method not implemented.");
    }

    mirrorVertical(reference: IReference): IReference {
        reference.height;
        throw new Error("Method not implemented.");
    }
    rotateClockwise(reference: IReference): IReference {
        reference.height;
        throw new Error("Method not implemented.");
    }
    rotateCounterClockwise(reference: IReference): IReference {
        reference.height;
        throw new Error("Method not implemented.");
    }

}