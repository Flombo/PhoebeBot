"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const botRouter_1 = require("./botRouter");
const app = (0, express_1.default)();
app.use(botRouter_1.botRouter);
app.listen(process.env.PORT, () => console.log('Server listening on port 3000'));
