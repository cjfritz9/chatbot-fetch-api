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
const osrsRouter = express_1.default.Router();
// TODO: ADD USERNAME SUPPORT TO TRACK TOTAL
// TODO: ADD RAID PARTY SUPPORT (!join command?)
// TODO: IMPLEMENT RNG BUFF STANDALONE
osrsRouter.get('/raids/cox', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.query;
        if (!username) {
            return res.send('Error - No username was supplied');
        }
        let user = yield (0, osrs_1.getUser)(username);
        if (!user) {
            user = { username: 'username', gp: '0', rngBuff: 0 };
        }
        const loot = RAIDS.raidCox(user.rngBuff);
        loot.dbEntry.price = yield OSRS.fetchAndAddPrices(loot.itemInfo);
        const totalWealth = (+user.gp + +loot.dbEntry.price).toString();
        const formattedPrice = OSRS.formatGP(loot.dbEntry.price);
        const formattedWealth = OSRS.formatGP(totalWealth);
        (0, osrs_1.updateUser)(username, totalWealth, JSON.stringify(loot.dbEntry));
        if (loot.beam === 'purple') {
            res.send(`${username} enters the Chambers of Xeric. They complete the raid with ${(+loot.points.toFixed(0)).toLocaleString('en-US')} points. They see a joewatLOOT PURPLE joewatLOOT loot beam! Within the chest they find ${loot.itemName} worth ${formattedPrice}! Their total wealth is now: ${formattedWealth}`);
        }
        else {
            res.send(`${username} enters the Chambers of Xeric. They complete the raid with ${(+loot.points.toFixed(0)).toLocaleString('en-US')} points${loot.didPlank ? ' ( what a planker x0r6ztGiggle !)' : ''}. They see a white loot beam. Never lucky Sadge . Within the chest they find ${loot.itemName} worth ${formattedPrice}. Their total wealth is now: ${formattedWealth}.`);
        }
    }
    catch (error) {
        res.send('Error - contact wandernaut#2205');
        console.error('Caught error: ', error);
    }
}));
osrsRouter.get('/raids/tob', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(':construction_site: Remaking this to be like !lootcox :construction_site:');
    // res.send(RAIDS.getTobPurple());
}));
osrsRouter.get('/raids/toa', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(':construction_site: Remaking this to be like !lootcox :construction_site:');
    // res.send(RAIDS.getToaPurple());
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
// osrsRouter.get('/raids/tob_buff', async (req: any, res: any) => {
//   const { rngBonus, username } = req.query;
//   res.send(RAIDS.getTobPurple(rngBonus));
// });
// osrsRouter.get('/raids/toa_buff', async (req: any, res: any) => {
//   const { rngBonus, username } = req.query;
//   res.send(RAIDS.getToaPurple(rngBonus));
// });
exports.default = osrsRouter;
