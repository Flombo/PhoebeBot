import { IReferenceCommand } from "../commands/IReferenceCommand";
import { IReference } from "./IReference";
import { ReferenceRetrieverService } from "./ReferenceRetrieverService";

export class DeviantArtReferenceRetrieverService extends ReferenceRetrieverService {

    getReference(command: IReferenceCommand): Promise<Array<IReference>> {
        command.name
        throw new Error("Method not implemented.");
    }

}