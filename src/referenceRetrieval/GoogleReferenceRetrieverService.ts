import { ICommand } from "../commands/ICommand";
import { IReference } from "./IReference";
import { ReferenceRetrieverService } from "./ReferenceRetrieverService";

export class GoogleReferenceRetrieverService extends ReferenceRetrieverService {
    
    getReference(command: ICommand): Promise<IReference> {
        command.data
        throw new Error("Method not implemented.");
    }
    
}