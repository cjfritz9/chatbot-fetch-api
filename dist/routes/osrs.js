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
const Raids = __importStar(require("../utils/raids-loot"));
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
    const loot = Raids.getCoxPurple(true);
    const [response, user] = yield Promise.all([
        axios_1.default.get(`${OSRS_API}?id=${loot.itemId}`, {
            headers
        }),
        (0, osrs_1.getUser)(username)
    ]);
    if ((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data) {
        const high = response.data.data[loot.itemId].high;
        const low = response.data.data[loot.itemId].low;
        const diff = high - low;
        const price = Math.round(low + diff / 2).toString();
        let formattedPrice;
        console.log(price);
        if (price.length > 9) {
            formattedPrice =
                price.slice(0, price.length - 9) + '.' + price.charAt(1) + 'B';
        }
        if (price.length < 10 && price.length > 6) {
            formattedPrice = price.slice(0, price.length - 6) + 'M';
        }
        const totalWealth = (+price + +user.gp).toString();
        (0, osrs_1.updateUser)(username, totalWealth);
        res.send(`${username} successfully completed the Chambers of Xeric and received ${loot.message} worth ${formattedPrice}. Total wealth: ${totalWealth}`);
    }
    else {
        res.send('Server Error: Contact wandernaut#2205');
    }
}));
osrsRouter.get('/:username/raids/tob', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(Raids.getTobPurple());
}));
osrsRouter.get('/:username/raids/toa', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(Raids.getToaPurple());
}));
osrsRouter.get('/:username/raids/cox_buff', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(Raids.getCoxPurple(true));
}));
osrsRouter.get('/:username/raids/tob_buff', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(Raids.getTobPurple(true));
}));
osrsRouter.get('/:username/raids/toa_buff', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(Raids.getToaPurple(true));
}));
exports.default = osrsRouter;
