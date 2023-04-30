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
exports.rollQuantity = exports.standardCoxLoot = exports.getMedianPrice = exports.formatGP = exports.fetchAndAddPrices = void 0;
const axios_1 = __importDefault(require("axios"));
const fetchAndAddPrices = (items) => __awaiter(void 0, void 0, void 0, function* () {
    const OSRS_API = 'https://prices.runescape.wiki/api/v1/osrs/latest';
    const headers = { 'User-Agent': 'chatbot_raid_sim - @wandernaut#2205' };
    const responses = yield Promise.all(items.map((item) => {
        return axios_1.default.get(`${OSRS_API}?id=${item.itemId}`, {
            headers
        });
    }));
    let totalValue = '0';
    responses.map((res, i) => {
        var _a;
        if ((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.data) {
            console.log('response data: ', res.data.data);
            const itemPrices = res.data.data[items[i].itemId];
            if (itemPrices) {
                console.log('item prices: ', itemPrices);
                const stackValue = +(0, exports.getMedianPrice)(itemPrices.low, itemPrices.high) * items[i].quantity;
                console.log('stack value: ', stackValue);
                totalValue = (+totalValue + +stackValue).toString();
            }
            else {
                totalValue = totalValue;
            }
        }
    });
    return totalValue;
});
exports.fetchAndAddPrices = fetchAndAddPrices;
const formatGP = (gp) => {
    if (gp.length < 7) {
        return gp.slice(0, gp.length - 3) + 'k';
    }
    else if (gp.length < 10) {
        return gp.slice(0, gp.length - 6) + '.' + gp.charAt(1) + 'M';
    }
    else if (gp.length < 13) {
        return gp.slice(0, gp.length - 9) + '.' + gp.charAt(1) + 'B';
    }
    else {
        return gp.slice(0, gp.length - 12) + '.' + gp.charAt(1) + 'T';
    }
};
exports.formatGP = formatGP;
const getMedianPrice = (lowPrice, highPrice) => {
    const diff = highPrice - lowPrice;
    return Math.round(lowPrice + diff / 2).toString();
};
exports.getMedianPrice = getMedianPrice;
exports.standardCoxLoot = [
    { name: 'Death rune', id: '560', maxQty: 3640 },
    { name: 'Blood rune', id: '565', maxQty: 4095 },
    { name: 'Soul rune', id: '566', maxQty: 6553 },
    { name: 'Rune Arrow', id: '892', maxQty: 9362 },
    { name: 'Dragon Arrow', id: '11212', maxQty: 648 },
    { name: 'Grimy ranarr weed', id: '207', maxQty: 163 },
    { name: 'Grimy toadflax', id: '3049', maxQty: 248 },
    { name: 'Grimy irit leaf', id: '209', maxQty: 809 },
    { name: 'Grimy avantoe', id: '211', maxQty: 404 },
    { name: 'Grimy kwuarm', id: '213', maxQty: 338 },
    { name: 'Grimy snapdragon', id: '3051', maxQty: 97 },
    { name: 'Grimy cadantine', id: '215', maxQty: 394 },
    { name: 'Grimy lantadyme', id: '2485', maxQty: 526 },
    { name: 'Grimy dwarf weed', id: '217', maxQty: 655 },
    { name: 'Grimy torstol', id: '219', maxQty: 161 },
    { name: 'Silver ore', id: '442', maxQty: 6553 },
    { name: 'Coal', id: '453', maxQty: 6553 },
    { name: 'Gold ore', id: '444', maxQty: 2978 },
    { name: 'Mithril ore', id: '447', maxQty: 4095 },
    { name: 'Adamantite ore', id: '449', maxQty: 789 },
    { name: 'Runite ore', id: '451', maxQty: 65 },
    { name: 'Uncut sapphire', id: '1623', maxQty: 693 },
    { name: 'Uncut emerald', id: '1621', maxQty: 923 },
    { name: 'Uncut ruby', id: '1619', maxQty: 541 },
    { name: 'Uncut diamond', id: '1617', maxQty: 255 },
    { name: 'Lizardman fang', id: '13391', maxQty: 4681 },
    { name: 'Pure essence', id: '7936', maxQty: 65535 },
    { name: 'Saltpetre', id: '13421', maxQty: 5461 },
    { name: 'Teak plank', id: '8780', maxQty: 1365 },
    { name: 'Mahogany plank', id: '8782', maxQty: 548 },
    { name: 'Dynamite', id: '13573', maxQty: 2427 },
    { name: 'Torn prayer scroll', id: '21047', maxQty: 1 },
    { name: 'Dark relic', id: '0', maxQty: 1 }
];
const rollQuantity = (maxQty, didPlank) => {
    const quantity = maxQty / 3.3;
    if (maxQty === 1)
        return 1;
    if (didPlank) {
        return Math.round(quantity);
    }
    else {
        return Math.round(quantity / 2);
    }
};
exports.rollQuantity = rollQuantity;
