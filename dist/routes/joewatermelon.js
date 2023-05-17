"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dog_treat_1 = __importDefault(require("../utils/joewatermelon/dog-treat"));
const gp_reward_1 = __importDefault(require("../utils/joewatermelon/gp-reward"));
const joewatermelon_1 = require("../db/joewatermelon");
dotenv_1.default.config();
const joeRouter = express_1.default.Router();
joeRouter.get('/dog_treat', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, dog_treat_1.default)());
}));
joeRouter.get('/gp_reward', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.query;
    const { reward, message } = (0, gp_reward_1.default)(username);
    (0, joewatermelon_1.addGpRewardEntry)(username, reward);
    res.send(message);
}));
exports.default = joeRouter;
