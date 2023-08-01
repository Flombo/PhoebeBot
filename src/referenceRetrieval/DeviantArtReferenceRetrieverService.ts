import { ICommand } from "../commands/ICommand";
import { IReference } from "./IReference";
import { ReferenceRetrieverService } from "./ReferenceRetrieverService";

export class DeviantArtReferenceRetrieverService extends ReferenceRetrieverService {
    
    getReference(command: ICommand): Promise<IReference> {
        command.name
        throw new Error("Method not implemented.");
    }

}