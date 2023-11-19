"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.botRouter = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
exports.botRouter = express_1.default.Router();
exports.botRouter.get("/reference/pose/:gender/:clothing", function (req, res) {
    console.log("pose: ", req.params);
});
exports.botRouter.get("/reference/animals", function (req, res) {
    console.log("animals");
});
exports.botRouter.get("/reference/face/:gender", function (req, res) {
    console.log("face", req.params);
});
exports.botRouter.get("/reference/hands/:gender", function (req, res) {
    console.log("hands", req.params);
});
exports.botRouter.get("/reference/landscape", function (req, res) {
    res.send("About this wiki");
});
exports.botRouter.get("/reference/urban", function (req, res) {
    res.send("About this wiki");
});
console.log('');
