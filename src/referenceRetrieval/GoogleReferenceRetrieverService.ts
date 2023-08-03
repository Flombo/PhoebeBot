import { IReferenceCommand } from "../commands/IReferenceCommand";
import { IReference } from "./IReference";
import { ReferenceRetrieverService } from "./ReferenceRetrieverService";

export class GoogleReferenceRetrieverService extends ReferenceRetrieverService {

    getReference(command: IReferenceCommand): Promise<IReference> {
        command.data
        throw new Error("Method not implemented.");
    }

}