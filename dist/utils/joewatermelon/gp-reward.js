"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRandomGP = (username) => {
    const tableRoll = Math.round(Math.random() * 48) + 51;
    const failRoll = Math.round(Math.random() * 99) === 0 ? true : false;
    if (failRoll) {
        return {
            reward: '1 GP',
            message: `${username} rolled 0 and won 1 GP x0r6ztGiggle !!`
        };
    }
    if (tableRoll === 73) {
        return {
            reward: '73 GP',
            message: `${username} rolled ${tableRoll} and won 73 GP x0r6ztGiggle`
        };
    }
    else if (tableRoll === 99) {
        return {
            reward: 'A BOND',
            message: `${username} rolled ${tableRoll} and won A BOND PogOBusiness`
        };
    }
    else {
        const gpRoll = (Math.round(Math.random() * 49) + 26) * 10;
        return {
            reward: `${gpRoll}k`,
            message: `${username} rolled ${tableRoll} and won ${gpRoll}k!`
        };
    }
};
exports.default = getRandomGP;
