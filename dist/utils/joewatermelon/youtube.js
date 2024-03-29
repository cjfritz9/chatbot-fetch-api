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
exports.getLatestYtMedia = void 0;
const axios_1 = __importDefault(require("axios"));
const getLatestYtMedia = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC-vjqhlVcyT54gUgzCGO13A&maxResults=1&order=date&type=video&key=AIzaSyD2sRkhratG3GHXwi220t7b47bLEXvO5pc');
    if (response &&
        response.data &&
        response.data.items &&
        response.data.items[0]) {
        const media = response.data.items[0];
        const formattedTitle = formatVideoTitle(media.snippet.title);
        return `Check out my latest video! ${formattedTitle} https://www.youtube.com/watch?v=${media.id.videoId}`;
    }
    else {
        return '[Error fetching latest video]';
    }
});
exports.getLatestYtMedia = getLatestYtMedia;
const formatVideoTitle = (rawTitle) => {
    const titleChars = [...rawTitle];
    for (let i = 0; i < titleChars.length; i++) {
        if (titleChars[i] === '#') {
            for (let j = 0; j < titleChars.length; j++) {
                if (titleChars[j] === ' ') {
                    titleChars.splice(i, j);
                }
            }
        }
    }
    return titleChars.join('');
};
