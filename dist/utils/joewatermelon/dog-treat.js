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
Object.defineProperty(exports, "__esModule", { value: true });
const joewatermelon_1 = require("../../db/joewatermelon");
const getDogTreat = (lastDog = null) => __awaiter(void 0, void 0, void 0, function* () {
    const roll = Math.round(Math.random());
    let response = { lastDog };
    // Skip call to database if recursion is running and lastDog
    // is already known
    if (lastDog === null) {
        response = yield (0, joewatermelon_1.getLastDog)();
    }
    if (!response)
        return { error: 'Database error - contact wandernaut#2205' };
    if (response.error) {
        console.error(response);
        return { error: 'Database error - contact wandernaut#2205' };
    }
    if (roll === response.lastDog) {
        return yield getDogTreat(response.lastDog);
    }
    else {
        (0, joewatermelon_1.updateLastDog)(roll);
        if (roll === 0) {
            return 'Finn is the good pupper and gets a treat! joewatFinn';
        }
        else if (roll === 1) {
            return 'Tilly is the good pupper and gets a treat! joewatTilly';
        }
    }
});
/**
 * Deprecated. Rolls 0-2 to simply return one of the three options.
 * The new method removes rolling the same option twice in a row.
 */
// const DEP_getDogTreat = () => {
//   const roll = Math.round(Math.random() * 2);
//   if (roll === 0) {
//     return 'Finn is the good pupper and gets a treat! joewatFinn';
//   } else if (roll === 1) {
//     return 'Tilly is the good pupper and gets a treat! joewatTilly';
//   } else {
//     return 'Zippy is the good pupper and gets a treat! joewatZippy';
//   }
// };
exports.default = getDogTreat;
