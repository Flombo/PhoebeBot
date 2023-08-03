import * as fs from 'fs';
import path from "path";

export class ComponentFilesHelper {

    private _componentFiles: Array<string>;

    constructor() {
        this._componentFiles = new Array();
    }

    get componentFiles(): Array<string> {
        return this._componentFiles;
    }

    /**
     * Recursive command json retrieval.
     * @param filePath 
     */
    public findJSONComponentFiles(filePath: string): void {
        const filesInDirectory = fs.readdirSync(filePath);

        filesInDirectory.forEach(file => {
            const absolutePath = path.join(filePath, file);

            if (fs.statSync(absolutePath).isDirectory()) {
                this.findJSONComponentFiles(absolutePath);
            } else {
                if (file.includes('.json')) {
                    this._componentFiles.push(absolutePath);
                }
            }
        });
    }

}