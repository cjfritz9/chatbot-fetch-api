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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = require("fs");
const lib_1 = require("@twurple/pubsub/lib");
const lib_2 = require("@twurple/auth/lib");
const userId = process.env.USER_ID;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const authProvider = new lib_2.RefreshingAuthProvider({
    clientId,
    clientSecret,
    onRefresh: (userId, newTokenData) => __awaiter(void 0, void 0, void 0, function* () {
        return yield fs_1.promises.writeFile(`./db/tokens.${userId}.json`, JSON.stringify(newTokenData, null, 4), 'utf-8');
    })
});
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: '*' }));
const hunt_showdown_1 = __importDefault(require("./routes/hunt_showdown"));
app.use('/hunt_showdown', hunt_showdown_1.default);
const osrs_1 = __importDefault(require("./routes/osrs"));
app.use('/osrs', osrs_1.default);
const joewatermelon_1 = __importDefault(require("./routes/joewatermelon"));
app.use('/joewatermelon', joewatermelon_1.default);
app.listen(PORT, () => {
    const pubSubClient = new lib_1.PubSubClient({ authProvider });
    const handler = pubSubClient.onRedemption(userId, (message) => {
        console.log(`${message.rewardTitle} was just redeemed!`);
    });
    console.log(`Server running on port: ${PORT}`);
});
exports.default = app;
