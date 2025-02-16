"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBroadcasterId = void 0;
const broadcasters_json_1 = __importDefault(require("./broadcasters.json"));
const getBroadcasterId = (username) => {
    try {
        const channelId = broadcasters_json_1.default === null || broadcasters_json_1.default === void 0 ? void 0 : broadcasters_json_1.default[username.toLowerCase()];
        if (!channelId) {
            return null;
        }
        return channelId;
    }
    catch (error) {
        console.error('getBroadcasterId()', error);
        return null;
    }
};
exports.getBroadcasterId = getBroadcasterId;
