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
const axios_1 = __importDefault(require("axios"));
const pubsub_1 = require("@twurple/pubsub");
const auth_1 = require("@twurple/auth");
const fs_1 = require("fs");
const joeRouter = express_1.default.Router();
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const accessToken = process.env.ACCESS_TOKEN;
const refreshToken = process.env.REFRESH_TOKEN;
const tokenData = {
    accessToken,
    refreshToken,
    expiresIn: 0,
    obtainmentTimestamp: 0
};
joeRouter.get('/auth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.url.slice(req.url.indexOf('=') + 1, req.url.indexOf('&'));
    console.log('--code: ', code);
    const response = yield axios_1.default.post('https://id.twitch.tv/oauth2/token', `client_id=1xkvdpm0d3i7kkfsvcglm29dvv71g4&client_secret=cme6w5kqh6b0bzvm7ag45ypfdxoibl&code=${code}&grant_type=authorization_code&redirect_uri=https://nightbot-fetch-api-l75xpo5a3a-uc.a.run.app/joewatermelon/auth`);
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
            return yield fs_1.promises.writeFile(`./tokens.${userId}.json`, JSON.stringify(newTokenData, null, 4), 'utf-8');
        })
    });
    if (!authProvider) {
        res.send('Failed');
    }
    else {
        const userId = yield authProvider.addUserForToken(tokenData);
        const pubSubClient = new pubsub_1.PubSubClient({ authProvider });
        const handler = pubSubClient.onRedemption(userId, (message) => {
            console.log(`${message.rewardTitle} was just redeemed!`);
        });
        console.log(handler);
        res.send('Success: ');
    }
    // res.send(getDogTreat());
}));
exports.default = joeRouter;
console.log('https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=1xkvdpm0d3i7kkfsvcglm29dvv71g4&redirect_uri=https://nightbot-fetch-api-l75xpo5a3a-uc.a.run.app/joewatermelon/auth&scope=channel%3Aread%3Aredemptions&state=c3ab8aa609ea11e793ae92361f002671');
console.log('client_id=1xkvdpm0d3i7kkfsvcglm29dvv71g4&client_secret=cme6w5kqh6b0bzvm7ag45ypfdxoibl&code=e9au4i5p7wjvagobzu63bkeoy6ah4p&grant_type=authorization_code&redirect_uri=https://nightbot-fetch-api-l75xpo5a3a-uc.a.run.app/joewatermelon/auth');
