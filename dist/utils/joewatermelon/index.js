"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getDogTreat = () => {
    const roll = Math.round(Math.random() * 100);
    if (roll < 33) {
        return 'Finn is the good pupper and gets a treat! joewatFinn';
    }
    else if (roll < 66) {
        return 'Tilly is the good pupper and gets a treat! joewatTilly';
    }
    else if (roll < 100) {
        return 'Zippy is the good pupper and gets a treat! joewatZippy';
    }
    else {
        return 'Joe is the good boy and gets a pat PATTHEMELON';
    }
};
exports.default = getDogTreat;
