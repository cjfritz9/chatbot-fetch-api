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
const RAIDS = __importStar(require("../utils/osrs/raids"));
const OSRS = __importStar(require("../utils/osrs/helpers"));
const osrs_1 = require("../db/osrs");
const price_checker_1 = require("../utils/osrs/price-checker");
const osrsRouter = express_1.default.Router();
// TODO: ADD RAID PARTY SUPPORT (!join command?)
// TODO: ADD TERTIARY LOOT/PETS
osrsRouter.get('/raids/cox', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.query;
        if (!username) {
            return res.send('Error - No username was supplied');
        }
        let user = yield (0, osrs_1.getUser)(username);
        if (!user) {
            user = { username: username, gp: '0', rngBuff: 0 };
        }
        const loot = RAIDS.raidCox(user.rngBuff);
        loot.dbEntry.price = yield OSRS.fetchAndAddPrices(loot.itemInfo);
        const totalWealth = (+user.gp + +loot.dbEntry.price).toString();
        const formattedPrice = OSRS.formatGP(loot.dbEntry.price);
        const formattedWealth = OSRS.formatGP(totalWealth);
        const formattedPoints = (+loot.points.toFixed(0)).toLocaleString('en-US');
        (0, osrs_1.updateUser)(username, totalWealth, JSON.stringify(loot.dbEntry));
        const params = {
            raid: RAIDS.RaidTypes.COX,
            username,
            isPurple: loot.beam === 'purple',
            lootString: loot.itemName,
            lootValue: formattedPrice,
            totalWealth: formattedWealth,
            points: formattedPoints,
            deaths: loot.didPlank ? '1' : '0'
        };
        res.send(RAIDS.getChatString(params));
    }
    catch (error) {
        console.error('Caught error: ', error);
        res.send('[Error]');
    }
}));
osrsRouter.get('/raids/tob', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.query;
        if (!username) {
            return res.send('Error - No username was supplied');
        }
        let user = yield (0, osrs_1.getUser)(username);
        if (!user) {
            user = { username: username, gp: '0', rngBuff: 0 };
        }
        const loot = RAIDS.raidTob(user.rngBuff);
        const isPurple = loot.chestColor === 'purple';
        loot.dbEntry.price = yield OSRS.fetchAndAddPrices(loot.itemInfo);
        const value = isPurple
            ? +'0' + +loot.dbEntry.price / 3
            : +'0' + +loot.dbEntry.price;
        const formattedValue = OSRS.formatGP(value.toFixed(0));
        const totalWealth = (isPurple ? (+user.gp + value).toFixed(0) : +user.gp + value).toString();
        const formattedWealth = OSRS.formatGP(totalWealth);
        (0, osrs_1.updateUser)(username, totalWealth, JSON.stringify(loot.dbEntry));
        const params = {
            raid: RAIDS.RaidTypes.TOB,
            username,
            isPurple,
            lootString: loot.itemName,
            lootValue: `${formattedValue}${isPurple ? '(split)' : ''}`,
            totalWealth: formattedWealth,
            deaths: loot.deaths.toString()
        };
        res.send(RAIDS.getChatString(params));
    }
    catch (error) {
        console.error('Caught error: ', error);
        res.send('[Error]');
    }
}));
osrsRouter.get('/raids/toa', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.query;
        if (!username) {
            return res.send('Error - No username was supplied');
        }
        let user = yield (0, osrs_1.getUser)(username);
        if (!user) {
            user = { username: username, gp: '0', rngBuff: 0 };
        }
        const loot = RAIDS.raidToa(user.rngBuff);
        loot.dbEntry.price = yield OSRS.fetchAndAddPrices(loot.itemInfo);
        const totalWealth = (+user.gp + +loot.dbEntry.price).toString();
        const formattedPrice = OSRS.formatGP(loot.dbEntry.price);
        const formattedWealth = OSRS.formatGP(totalWealth);
        (0, osrs_1.updateUser)(username, totalWealth, JSON.stringify(loot.dbEntry));
        const params = {
            raid: RAIDS.RaidTypes.TOA,
            username,
            isPurple: loot.chestColor === 'purple',
            lootString: loot.itemName,
            lootValue: `${formattedPrice}`,
            totalWealth: formattedWealth
        };
        res.send(RAIDS.getChatString(params));
    }
    catch (error) {
        console.error('Caught error: ', error);
        res.send('[Error]');
    }
}));
osrsRouter.get('/rngbuff', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.query;
    const response = yield (0, osrs_1.addRng)(username);
    if (response.error) {
        res.send(response.error);
    }
    else {
        res.send(response.success);
    }
}));
osrsRouter.get('/price-checker', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { alpha } = req.query;
    if (!alpha) {
        res.send('Try !pc [item name]');
    }
    const response = yield (0, price_checker_1.getItemPriceByAlpha)(alpha);
    res.send(response);
}));
exports.default = osrsRouter;
