"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getDogTreat = () => {
    const roll = Math.round(Math.random() * 99);
    if (roll < 33) {
        return 'Finn is the good pupper and gets a treat! joewatFinn';
    }
    else if (roll < 66) {
        return 'Tilly is the good pupper and gets a treat! joewatTilly';
    }
    else {
        return 'Zippy is the good pupper and gets a treat! joewatZippy';
    }
};
exports.default = getDogTreat;
