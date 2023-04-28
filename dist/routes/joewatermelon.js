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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const pubsub_1 = require("@twurple/pubsub");
const auth_1 = require("@twurple/auth");
const fs_1 = require("fs");
dotenv_1.default.config();
const joeRouter = express_1.default.Router();
const userId = process.env.USER_ID;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
// const accessToken = process.env.ACCESS_TOKEN!;
// const refreshToken = process.env.REFRESH_TOKEN!;
joeRouter.get('/auth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    const response = yield axios_1.default.post('https://id.twitch.tv/oauth2/token', `client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code&redirect_uri=https://nightbot-fetch-api-l75xpo5a3a-uc.a.run.app/joewatermelon/auth`);
    if (response && response.data) {
        console.log('--user token data: ', response.data);
        res.send('Success. Get hacked Joe!');
    }
    else {
        res.send('Failed');
    }
}));
joeRouter.get('/dog_treat', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authProvider = new auth_1.RefreshingAuthProvider({
        clientId,
        clientSecret,
        onRefresh: (userId, newTokenData) => __awaiter(void 0, void 0, void 0, function* () {
            return yield fs_1.promises.writeFile(`./db/tokens.${userId}.json`, JSON.stringify(newTokenData, null, 4), 'utf-8');
        })
    });
    console.log('auth provider has user ID: ', authProvider.hasUser(userId));
    if (!authProvider) {
        res.send('Failed');
    }
    else {
        const pubSubClient = new pubsub_1.PubSubClient({ authProvider });
        const handler = pubSubClient.onRedemption(userId, (message) => {
            console.log(`${message.rewardTitle} was just redeemed!`);
        });
        res.send('Success: ' + handler.topic);
    }
    // res.send(getDogTreat());
}));
exports.default = joeRouter;
