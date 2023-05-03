"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToaPurple = exports.getTobPurple = exports.getCoxPurple = exports.raidCox = void 0;
const helpers_1 = require("./helpers");
const raidCox = (rngBuff = 0) => {
    //@ts-ignore
    let purpleThreshold = 867500;
    if (rngBuff === 1) {
        purpleThreshold = purpleThreshold / 4;
    }
    if (rngBuff === 2) {
        purpleThreshold = purpleThreshold / 8;
    }
    console.log('RNG BUFF: ', rngBuff);
    console.log('PURP THRESH: ', purpleThreshold);
    const { points, didPlank } = getPoints();
    let isPurple = false;
    if (Math.random() < points / purpleThreshold) {
        isPurple = true;
    }
    if (isPurple) {
        return (0, exports.getCoxPurple)(rngBuff, points, didPlank);
    }
    else {
        const roll1 = helpers_1.standardCoxLoot[Math.round(Math.random() * 32)];
        const roll2 = helpers_1.standardCoxLoot[Math.round(Math.random() * 32)];
        const roll1qty = (0, helpers_1.rollQuantity)(roll1.maxQty, didPlank);
        const roll2qty = (0, helpers_1.rollQuantity)(roll2.maxQty, didPlank);
        const response = {
            points,
            didPlank,
            beam: 'white',
            itemInfo: [
                { itemId: roll1.id, quantity: roll1qty },
                { itemId: roll2.id, quantity: roll2qty }
            ],
            itemName: `${roll1qty}x ${roll1.name} and ${roll2qty}x ${roll2.name}`,
            dbEntry: {
                item: `${roll1qty}x ${roll1.name} and ${roll2qty}x ${roll2.name}`,
                price: '',
                dateReceived: new Date().toUTCString()
            }
        };
        return response;
    }
};
exports.raidCox = raidCox;
const getCoxPurple = (rngBuff = 0, points, didPlank) => {
    //@ts-ignore
    const roll = getRoll(rngBuff);
    const response = {
        points,
        didPlank,
        beam: 'purple',
        itemInfo: [{ itemId: '0', quantity: 1 }],
        itemName: '',
        dbEntry: {
            item: '',
            price: '',
            dateReceived: new Date().toUTCString()
        }
    };
    if (roll < 29.986) {
        response.itemInfo[0].itemId = '21034';
        response.itemName = 'a Dexterous prayer scroll';
        response.dbEntry.item = 'Dexterous prayer scroll';
    }
    else if (roll < 57.972) {
        response.itemInfo[0].itemId = '21079';
        response.itemName = 'an Arcane prayer scroll';
        response.dbEntry.item = 'Arcane prayer scroll';
    }
    else if (roll < 63.769) {
        response.itemInfo[0].itemId = '21000';
        response.itemName = 'a Twisted buckler';
        response.dbEntry.item = 'Twisted buckler';
    }
    else if (roll < 69.566) {
        response.itemInfo[0].itemId = '21012';
        response.itemName = 'a Dragon hunter crossbow';
        response.dbEntry.item = 'Dragon hunter crossbow';
    }
    else if (roll < 73.914) {
        response.itemInfo[0].itemId = '21015';
        response.itemName = "a Dinh's bulwark";
        response.dbEntry.item = "Dinh's bulwark";
    }
    else if (roll < 78.262) {
        response.itemInfo[0].itemId = '21018';
        response.itemName = 'an Ancestral hat';
        response.dbEntry.item = 'Ancestral hat';
    }
    else if (roll < 82.61) {
        response.itemInfo[0].itemId = '21021';
        response.itemName = 'an Ancestral robe top';
        response.dbEntry.item = 'Ancestral robe top';
    }
    else if (roll < 86.958) {
        response.itemInfo[0].itemId = '21024';
        response.itemName = 'an Ancestral robe bottom';
        response.dbEntry.item = 'Ancestral robe bottom';
    }
    else if (roll < 91.306) {
        response.itemInfo[0].itemId = '13652';
        response.itemName = 'Dragon claws';
        response.dbEntry.item = 'Dragon claws';
    }
    else if (roll < 94.205) {
        response.itemInfo[0].itemId = '21003';
        response.itemName = 'an Elder maul';
        response.dbEntry.item = 'Elder maul';
    }
    else if (roll < 97.104) {
        response.itemInfo[0].itemId = '21043';
        response.itemName = 'a Kodai insignia';
        response.dbEntry.item = 'Kodai insignia';
    }
    else {
        response.itemInfo[0].itemId = '20997';
        response.itemName = 'a Twisted bow';
        response.dbEntry.item = 'Twisted bow';
    }
    return response;
};
exports.getCoxPurple = getCoxPurple;
const getTobPurple = (rngBuff = 0) => {
    //@ts-ignore
    const roll = getRoll(rngBuff);
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
const getToaPurple = (rngBuff = 0) => {
    //@ts-ignore
    const roll = getRoll(rngBuff);
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
const getRoll = (rngBuff) => {
    let roll = Math.random() * 100;
    if (rngBuff === 0) {
        return roll;
    }
    else if (rngBuff === 1) {
        const difference = 100 - roll;
        roll += Math.random() * difference;
        return roll;
    }
    else {
        const roll1 = Math.random() * 100;
        const roll2 = Math.random() * 100;
        let bestRoll = roll1 > roll2 ? roll1 : roll2;
        const difference = 100 - bestRoll;
        bestRoll += Math.random() * difference;
        return bestRoll;
    }
};
const getPoints = () => {
    let points = Math.random() * 15000 + 25000;
    const plankRoll = Math.random() * 100;
    let didPlank = false;
    if (plankRoll < 6.5) {
        points = points / 1.75;
        didPlank = true;
    }
    return {
        didPlank,
        points
    };
};
