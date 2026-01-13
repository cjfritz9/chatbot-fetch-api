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
const crypto_1 = __importDefault(require("crypto"));
const express_1 = __importDefault(require("express"));
const api_1 = require("../utils/twitch/api");
const general_1 = require("../db/general");
const twitchEventSubRouter = express_1.default.Router();
const TWITCH_MESSAGE_SIGNATURE = 'twitch-eventsub-message-signature';
const TWITCH_MESSAGE_ID = 'twitch-eventsub-message-id';
const TWITCH_MESSAGE_TIMESTAMP = 'twitch-eventsub-message-timestamp';
const TWITCH_MESSAGE_TYPE = 'twitch-eventsub-message-type';
const MESSAGE_TYPE_VERIFICATION = 'webhook_callback_verification';
const MESSAGE_TYPE_NOTIFICATION = 'notification';
const MESSAGE_TYPE_REVOCATION = 'revocation';
function getHmacMessage(messageId, timestamp, body) {
    return messageId + timestamp + body;
}
function getHmac(secret, message) {
    return 'sha256=' + crypto_1.default.createHmac('sha256', secret).update(message).digest('hex');
}
function verifyMessage(expectedHmac, providedHmac) {
    const expected = Buffer.from(expectedHmac);
    const provided = Buffer.from(providedHmac);
    if (expected.length !== provided.length) {
        return false;
    }
    return crypto_1.default.timingSafeEqual(new Uint8Array(expected), new Uint8Array(provided));
}
// Raw body middleware for signature verification
twitchEventSubRouter.use(express_1.default.raw({ type: 'application/json' }));
twitchEventSubRouter.post('/webhook', (req, res) => {
    var _a;
    const secret = process.env.TWITCH_WEBHOOK_SECRET;
    if (!secret) {
        console.error('TWITCH_WEBHOOK_SECRET not configured');
        return res.status(500).send('Server configuration error');
    }
    const signature = req.headers[TWITCH_MESSAGE_SIGNATURE];
    const messageId = req.headers[TWITCH_MESSAGE_ID];
    const timestamp = req.headers[TWITCH_MESSAGE_TIMESTAMP];
    const messageType = req.headers[TWITCH_MESSAGE_TYPE];
    // Convert raw body buffer to string for HMAC and parsing
    const rawBody = req.body.toString('utf8');
    const hmacMessage = getHmacMessage(messageId, timestamp, rawBody);
    const expectedHmac = getHmac(secret, hmacMessage);
    if (!verifyMessage(expectedHmac, signature)) {
        console.error('Invalid signature');
        return res.status(403).send('Invalid signature');
    }
    const body = JSON.parse(rawBody);
    // Handle different message types
    if (messageType === MESSAGE_TYPE_VERIFICATION) {
        console.log('Received verification challenge');
        return res.status(200).send(body.challenge);
    }
    if (messageType === MESSAGE_TYPE_REVOCATION) {
        console.log('Subscription revoked:', body.subscription);
        return res.status(204).send();
    }
    if (messageType === MESSAGE_TYPE_NOTIFICATION) {
        const event = body.event;
        const subscriptionType = (_a = body.subscription) === null || _a === void 0 ? void 0 : _a.type;
        console.log('Received event:', subscriptionType);
        console.log('Event data:', JSON.stringify(event, null, 2));
        // Handle channel point redemption
        if (subscriptionType === 'channel.channel_points_custom_reward_redemption.add') {
            handleChannelPointRedemption(event);
        }
        return res.status(204).send();
    }
    res.status(204).send();
});
// VIP Roll reward name - update this to match your channel point reward
const VIP_ROLL_REWARD_NAME = 'VIP Roll';
function handleChannelPointRedemption(event) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user_name, user_input, reward, broadcaster_user_id, broadcaster_user_login, } = event;
        console.log('=== Channel Point Redemption ===');
        console.log('User:', user_name);
        console.log('Reward:', reward === null || reward === void 0 ? void 0 : reward.title);
        console.log('User Input:', user_input);
        console.log('Broadcaster:', broadcaster_user_login);
        console.log('================================');
        // Handle VIP Roll redemption
        if ((reward === null || reward === void 0 ? void 0 : reward.title) === VIP_ROLL_REWARD_NAME) {
            yield handleVipRoll(broadcaster_user_id, broadcaster_user_login, user_name, user_input);
        }
    });
}
function handleVipRoll(broadcasterId, channelName, username, userInput) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Parse user's guess (expecting a number 1-10)
            const userGuess = parseInt(userInput === null || userInput === void 0 ? void 0 : userInput.trim(), 10);
            if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
                yield (0, api_1.sendChatMessage)(broadcasterId, `@${username} Invalid guess! Please enter a number between 1 and 10.`);
                return;
            }
            // Generate dealer's roll
            const dealerRoll = Math.floor(Math.random() * 10) + 1;
            if (userGuess === dealerRoll) {
                yield (0, general_1.addVipWinner)(channelName, username);
                yield (0, api_1.sendChatMessage)(broadcasterId, `${username} WINS VIP! Poooound !!!!! [ guessed ${userGuess} against ${dealerRoll} ]`);
            }
            else {
                yield (0, api_1.sendChatMessage)(broadcasterId, `${username} lost 20k x0r6ztGiggle !! [ guessed ${userGuess} against ${dealerRoll} ]`);
            }
        }
        catch (error) {
            console.error('Error handling VIP roll:', error);
            yield (0, api_1.sendChatMessage)(broadcasterId, `@${username} Something went wrong with the VIP roll. Please try again!`);
        }
    });
}
exports.default = twitchEventSubRouter;
