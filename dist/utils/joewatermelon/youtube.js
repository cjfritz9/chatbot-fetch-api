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
    var _a, _b, _c, _d, _e, _f;
    const genericError = { error: '[Error fetching latest video]' };
    try {
        const response = yield axios_1.default.get('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC-vjqhlVcyT54gUgzCGO13A&maxResults=1&order=date&type=video&key=AIzaSyD2sRkhratG3GHXwi220t7b47bLEXvO5pc');
        if ((_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.items) === null || _b === void 0 ? void 0 : _b[0]) {
            const media = (_d = (_c = response === null || response === void 0 ? void 0 : response.data) === null || _c === void 0 ? void 0 : _c.items) === null || _d === void 0 ? void 0 : _d[0];
            const title = (_e = media === null || media === void 0 ? void 0 : media.snippet) === null || _e === void 0 ? void 0 : _e.title;
            const videoId = (_f = media === null || media === void 0 ? void 0 : media.id) === null || _f === void 0 ? void 0 : _f.videoId;
            if (!title || !videoId) {
                return genericError;
            }
            const formattedTitle = formatVideoTitle(title);
            return `Check out my latest video! ${formattedTitle} https://www.youtube.com/watch?v=${videoId}`;
        }
        else {
            return genericError;
        }
    }
    catch (error) {
        console.error('Caught Error: ', error);
        return genericError;
    }
});
exports.getLatestYtMedia = getLatestYtMedia;
const formatVideoTitle = (rawTitle) => {
    const splitChar = '|';
    const titleChars = [...rawTitle];
    for (let i = 0; i < titleChars.length; i++) {
        if ((titleChars === null || titleChars === void 0 ? void 0 : titleChars[i]) === splitChar) {
            for (let j = 0; j < titleChars.length; j++) {
                if ((titleChars === null || titleChars === void 0 ? void 0 : titleChars[j]) === ' ') {
                    titleChars.splice(i + 1, j);
                }
            }
        }
    }
    return titleChars.join('');
};
