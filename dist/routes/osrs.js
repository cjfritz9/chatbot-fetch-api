"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const OSRS = __importStar(require("../utils/raids-loot"));
const axios_1 = __importDefault(require("axios"));
const osrs_1 = require("../db/osrs");
const OSRS_API = 'https://prices.runescape.wiki/api/v1/osrs/latest';
const headers = { 'User-Agent': 'chatbot_raid_sim - @wandernaut#2205' };
const osrsRouter = express_1.default.Router();
// TODO: ADD USERNAME SUPPORT TO TRACK TOTAL
// TODO: ADD RAID PARTY SUPPORT (!join command?)
osrsRouter.get('/:username/raids/cox', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { username } = req.params;
    console.log(username);
    const loot = OSRS.getCoxPurple(true);
    const [response, user] = yield Promise.all([
        axios_1.default.get(`${OSRS_API}?id=${loot.itemId}`, {
            headers
        }),
        (0, osrs_1.getUser)(username)
    ]);
    if ((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data) {
        const itemPrices = response.data.data[loot.itemId];
        const price = OSRS.getMedianPrice(itemPrices.low, itemPrices.high);
        const totalWealth = (+price + +user.gp).toString();
        const formattedPrice = OSRS.formatGP(price);
        const formattedWealth = OSRS.formatGP(totalWealth);
        (0, osrs_1.updateUser)(username, totalWealth);
        res.send(`${loot}`);
        // res.send(
        //   `${username} successfully completed the Chambers of Xeric and received ${loot.itemName} worth ${formattedPrice}! Total wealth: ${formattedWealth}`
        // );
    }
    else {
        res.send('Server Error - Contact wandernaut#2205');
    }
}));
osrsRouter.get('/:username/raids/tob', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(OSRS.getTobPurple());
}));
osrsRouter.get('/:username/raids/toa', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(OSRS.getToaPurple());
}));
osrsRouter.get('/:username/raids/cox_buff', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(OSRS.getCoxPurple(true));
}));
osrsRouter.get('/:username/raids/tob_buff', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(OSRS.getTobPurple(true));
}));
osrsRouter.get('/:username/raids/toa_buff', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(OSRS.getToaPurple(true));
}));
exports.default = osrsRouter;
