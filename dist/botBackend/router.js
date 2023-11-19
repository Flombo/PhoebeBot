"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const router = express_1.default.Router();
router.get("/reference/pose/:gender/:clothing", function (req, res) {
    console.log("pose: ", req.params);
});
router.get("/reference/animals", function (req, res) {
    console.log("animals");
});
router.get("/reference/face/:gender", function (req, res) {
    console.log("face", req.params);
});
router.get("/reference/hands/:gender", function (req, res) {
    console.log("hands", req.params);
});
router.get("/reference/landscape", function (req, res) {
    res.send("About this wiki");
});
router.get("/reference/urban", function (req, res) {
    res.send("About this wiki");
});
module.exports = router;
//# sourceMappingURL=router.js.map