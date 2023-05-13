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
        if (loot.beam === 'purple') {
            res.send(`${username} enters the Chambers of Xeric. They complete the raid with ${formattedPoints} points. They see a joewatLOOT PURPLE joewatLOOT loot beam! Within the chest they find ${loot.itemName} worth ${formattedPrice}! Their total wealth is now: ${formattedWealth}`);
        }
        else {
            res.send(`${username} enters the Chambers of Xeric. They complete the raid with ${formattedPoints} points${loot.didPlank ? ' ( what a planker x0r6ztGiggle !)' : ''}. They see a white loot beam. Never lucky Sadge . Within the chest they find ${loot.itemName} worth ${formattedPrice}. Their total wealth is now: ${formattedWealth}.`);
        }
    }
    catch (error) {
        res.send('Error - contact wandernaut#2205');
        console.error('Caught error: ', error);
    }
}));
osrsRouter.get('/raids/tob', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.query;
    if (!username) {
        return res.send('Error - No username was supplied');
    }
    let user = yield (0, osrs_1.getUser)(username);
    if (!user) {
        user = { username: username, gp: '0', rngBuff: 0 };
    }
    const loot = RAIDS.raidTob(user.rngBuff);
    loot.dbEntry.price = yield OSRS.fetchAndAddPrices(loot.itemInfo);
    console.log('loot res: ', loot);
    const formattedSplit = OSRS.formatGP((+'0' + +loot.dbEntry.price / 3).toFixed(0));
    const totalWealth = (loot.chestColor === 'purple'
        ? (+user.gp + +loot.dbEntry.price / 3).toFixed(0)
        : +user.gp + +loot.dbEntry.price).toString();
    const formattedPrice = OSRS.formatGP(loot.dbEntry.price);
    const formattedWealth = OSRS.formatGP(totalWealth);
    (0, osrs_1.updateUser)(username, totalWealth, JSON.stringify(loot.dbEntry));
    if (loot.horribleRng) {
        res.send(`
    ${username} enters the Theatre of Blood with two 0kc beginners from WDR. The beginners die in every room but ${username} carries the raid to the end GIGACHAD . At the end of the raid they see a joewatLOOT PURPLE joewatLOOT chest but it's in a beginner's name. Inside they find: Scythe of vitur (uncharged). They put ${username} on their ignore and hop worlds. F
    `);
    }
    else {
        if (loot.chestColor === 'purple') {
            res.send(`
      ${username} enters the Theatre of Blood with ${loot.weDoRaids
                ? 'two people from WDR monkaW'
                : "two GIGACHAD s from Joewatermelon's clan"}. They manage to finish the raid with ${loot.deaths} ${loot.deaths === 1 ? 'death' : 'deaths'} and find a joewatLOOT PURPLE joewatLOOT chest. Within the chest they find ${loot.itemName} (${formattedPrice} | ~${formattedSplit} split). Total wealth: ${formattedWealth}!
    `);
        }
        else {
            res.send(`
      ${username} enters the Theatre of Blood with ${loot.weDoRaids
                ? 'two people from WDR monkaW'
                : 'two GIGACHAD s from the Joewatermelon clan'}. They manage to finish the raid with ${loot.deaths} ${loot.deaths === 1 ? 'death' : 'deaths'} and do not find a purple chest Sadge . Within their chest they find ${loot.itemName} (${formattedPrice}). Total wealth ${formattedWealth}!
      `);
        }
    }
}));
osrsRouter.get('/raids/toa', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    console.log('loot res: ', loot);
    const totalWealth = (+user.gp + +loot.dbEntry.price).toString();
    const formattedPrice = OSRS.formatGP(loot.dbEntry.price);
    const formattedWealth = OSRS.formatGP(totalWealth);
    (0, osrs_1.updateUser)(username, totalWealth, JSON.stringify(loot.dbEntry));
    if (loot.chestColor === 'purple') {
        res.send(`
    ${username} enters the Tombs of Amascut. They finish the raid at level ${loot.raidLevel} and find a joewatLOOT PURPLE joewatLOOT chest! Within their chest they find ${loot.itemName} (${formattedPrice}). Total wealth ${formattedWealth}!
    `);
    }
    else {
        res.send(`
    ${username} enters the Tombs of Amascut. They finish the raid at level ${loot.raidLevel} and find a white chest. Within their chest they find ${loot.itemName} (${formattedPrice}). Total wealth ${formattedWealth}!
    `);
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
// osrsRouter.get('/raids/tob_buff', async (req: any, res: any) => {
//   const { rngBonus, username } = req.query;
//   res.send(RAIDS.getTobPurple(rngBonus));
// });
// osrsRouter.get('/raids/toa_buff', async (req: any, res: any) => {
//   const { rngBonus, username } = req.query;
//   res.send(RAIDS.getToaPurple(rngBonus));
// });
exports.default = osrsRouter;
