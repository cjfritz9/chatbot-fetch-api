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
exports.sendChatMessage = void 0;
const axios_1 = __importDefault(require("axios"));
const TWITCH_API_BASE = 'https://api.twitch.tv/helix';
function getTokens() {
    return {
        accessToken: process.env.ACCESS_TOKEN || '',
        refreshToken: process.env.REFRESH_TOKEN || '',
        clientId: process.env.CLIENT_ID || '',
        clientSecret: process.env.CLIENT_SECRET || '',
    };
}
function refreshAccessToken() {
    return __awaiter(this, void 0, void 0, function* () {
        const { refreshToken, clientId, clientSecret } = getTokens();
        const response = yield axios_1.default.post('https://id.twitch.tv/oauth2/token', null, {
            params: {
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: clientId,
                client_secret: clientSecret,
            },
        });
        // Note: In production, you'd want to persist the new tokens
        console.log('Refreshed Twitch access token');
        return response.data.access_token;
    });
}
function sendChatMessage(broadcasterId, message) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const { accessToken, clientId } = getTokens();
        const senderId = process.env.USER_ID || broadcasterId;
        try {
            yield axios_1.default.post(`${TWITCH_API_BASE}/chat/messages`, {
                broadcaster_id: broadcasterId,
                sender_id: senderId,
                message: message,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Client-Id': clientId,
                    'Content-Type': 'application/json',
                },
            });
            return true;
        }
        catch (error) {
            // If token expired, try refreshing
            if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
                console.log('Access token expired, refreshing...');
                try {
                    const newToken = yield refreshAccessToken();
                    yield axios_1.default.post(`${TWITCH_API_BASE}/chat/messages`, {
                        broadcaster_id: broadcasterId,
                        sender_id: senderId,
                        message: message,
                    }, {
                        headers: {
                            Authorization: `Bearer ${newToken}`,
                            'Client-Id': clientId,
                            'Content-Type': 'application/json',
                        },
                    });
                    return true;
                }
                catch (refreshError) {
                    console.error('Failed to send message after token refresh:', refreshError);
                    return false;
                }
            }
            console.error('Failed to send Twitch chat message:', ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data) || error.message);
            return false;
        }
    });
}
exports.sendChatMessage = sendChatMessage;
