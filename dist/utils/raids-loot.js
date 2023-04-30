"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToaPurple = exports.getTobPurple = exports.getCoxPurple = void 0;
const getCoxPurple = (rngBuff = false) => {
    const roll = rngBuff ? getBuffedRoll() : Math.random() * 100;
    let response = { itemId: 0, message: 'Special Loot: ' };
    if (roll < 29.986) {
        response.itemId = 21034;
        response.message += 'Dexterous prayer scroll';
    }
    else if (roll < 57.972) {
        response.itemId = 21079;
        response.message += 'Arcane prayer scroll';
    }
    else if (roll < 63.769) {
        response.itemId = 21000;
        response.message += 'Twisted buckler';
    }
    else if (roll < 69.566) {
        response.itemId = 21012;
        response.message += 'Dragon hunter crossbow';
    }
    else if (roll < 73.914) {
        response.itemId = 21015;
        response.message += "Dinh's bulwark";
    }
    else if (roll < 78.262) {
        response.itemId = 21018;
        response.message += 'Ancestral hat';
    }
    else if (roll < 82.61) {
        response.itemId = 21021;
        response.message += 'Ancestral robe top';
    }
    else if (roll < 86.958) {
        response.itemId = 21024;
        response.message += 'Ancestral robe bottom';
    }
    else if (roll < 91.306) {
        response.itemId = 13652;
        response.message += 'Dragon claws';
    }
    else if (roll < 94.205) {
        response.itemId = 21003;
        response.message += 'Elder maul';
    }
    else if (roll < 97.104) {
        response.itemId = 21043;
        response.message += 'Kodai insignia';
    }
    else {
        response.itemId = 20997;
        response.message += 'Twisted bow';
    }
    return response;
};
exports.getCoxPurple = getCoxPurple;
const getTobPurple = (rngBuff = false) => {
    const roll = rngBuff ? getBuffedRoll() : Math.random() * 100;
    let rewardMessage = 'You found something special: ';
    if (roll < 42.105) {
        rewardMessage += 'Avernic defender hilt';
    }
    else if (roll < 52.631) {
        rewardMessage += 'Ghrazi rapier';
    }
    else if (roll < 63.157) {
        rewardMessage += 'Sanguinesti staff (uncharged)';
    }
    else if (roll < 73.683) {
        rewardMessage += 'Justiciar faceguard';
    }
    else if (roll < 84.209) {
        rewardMessage += 'Justiciar chestguard';
    }
    else if (roll < 94.735) {
        rewardMessage += 'Justiciar legguards';
    }
    else {
        rewardMessage += 'Scythe of vitur (uncharged)';
    }
    return rewardMessage;
};
exports.getTobPurple = getTobPurple;
const getToaPurple = (rngBuff = false) => {
    const roll = rngBuff ? getBuffedRoll() : Math.random() * 100;
    let rewardMessage = 'You found something special: ';
    if (roll < 29.163) {
        rewardMessage += "Osmumten's fang";
    }
    else if (roll < 58.326) {
        rewardMessage += 'Lightbearer';
    }
    else if (roll < 70.826) {
        rewardMessage += "Elidinis' ward";
    }
    else if (roll < 79.159) {
        rewardMessage += 'Masori mask';
    }
    else if (roll < 87.492) {
        rewardMessage += 'Masori body';
    }
    else if (roll < 95.825) {
        rewardMessage += 'Masori chaps';
    }
    else if (roll < 99.991) {
        rewardMessage += "Tumeken's shadow (uncharged)";
    }
    else {
        if (rngBuff) {
            rewardMessage += "Tumeken's shadow (uncharged)";
        }
        else {
            rewardMessage += 'Fossilised dung';
        }
    }
    return rewardMessage;
};
exports.getToaPurple = getToaPurple;
const getBuffedRoll = () => {
    const roll1 = Math.random() * 100;
    const roll2 = Math.random() * 100;
    let bestRoll = roll1 > roll2 ? roll1 : roll2;
    const difference = 100 - bestRoll;
    bestRoll += Math.random() * difference;
    return bestRoll;
};
