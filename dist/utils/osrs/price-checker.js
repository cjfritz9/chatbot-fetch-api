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
exports.getItemPriceByAlpha = void 0;
const axios_1 = __importDefault(require("axios"));
/**
 * Alpha referes to the start of a query string, i.e "Twist"
 * being the start of a query searching for "Twisted Bow"
 */
const getItemPriceByAlpha = (alpha) => __awaiter(void 0, void 0, void 0, function* () {
    const BASE_API = `https://secure.runescape.com/m=itemdb_oldschool/api/catalogue/items.json?category=1&alpha=${alpha}&page=1`;
    const response = yield axios_1.default.get(BASE_API);
    if (!response || !response.data) {
        return 'Error fetching Grand Exchange data';
    }
    else if (!response.data.items[0]) {
        return `No price information found for "${alpha}". Check spelling and try again`;
    }
    else {
        const result = response.data.items[0];
        console.log(result.name);
        console.log(result.today);
        return `${result.name} is currently ${result.current.price}. Daily trend: ${result.today.trend === 'negative'
            ? result.today.price.toString().replaceAll('-', '📉🔽 ')
            : result.today.price.toString().replace('+', '📈🔼 ')}`;
    }
});
exports.getItemPriceByAlpha = getItemPriceByAlpha;
