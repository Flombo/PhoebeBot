"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentFilesHelper = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
class ComponentFilesHelper {
    _componentFiles;
    constructor() {
        this._componentFiles = new Array();
    }
    get componentFiles() {
        return this._componentFiles;
    }
    findJSONComponentFiles(filePath) {
        const filesInDirectory = fs.readdirSync(filePath);
        filesInDirectory.forEach(file => {
            const absolutePath = path_1.default.join(filePath, file);
            if (fs.statSync(absolutePath).isDirectory()) {
                this.findJSONComponentFiles(absolutePath);
            }
            else {
                if (file.includes('.json')) {
                    this._componentFiles.push(absolutePath);
                }
            }
        });
    }
}
exports.ComponentFilesHelper = ComponentFilesHelper;
