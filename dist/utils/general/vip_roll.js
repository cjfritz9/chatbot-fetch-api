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
exports.getVipRoll = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getVipRoll = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const genericError = '[Error getting VIP Roll]';
    try {
        const roll = Math.round(Math.random() * 9) + 1;
        if (roll === 1) {
            return `${username} rolled a ${roll} and WON vip! Poooound`;
        }
        else {
            return `${username} rolled a ${roll} and needed a 1... -25k x0r6ztGiggle `;
        }
    }
    catch (error) {
        console.error('Caught Error: ', error);
        return genericError;
    }
});
exports.getVipRoll = getVipRoll;
