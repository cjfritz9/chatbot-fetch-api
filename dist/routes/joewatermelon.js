"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joewatermelon_1 = __importDefault(require("../utils/joewatermelon"));
const joeRouter = express_1.default.Router();
joeRouter.get('/dog_treat', (_req, res) => {
    res.send((0, joewatermelon_1.default)());
});
exports.default = joeRouter;
