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
exports.app = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)({ origin: '*' }));
exports.app.use('*', (req) => {
    console.log('-----REQUEST LOGGER-----');
    console.log('request URL: ', req.originalUrl);
    console.log('request queries: ', Object.assign({}, req.query));
    console.log('request body: ', req.body);
    console.log('-----END LOGGER-----');
});
const hunt_showdown_1 = __importDefault(require("./routes/hunt-showdown"));
exports.app.use('/hunt_showdown', hunt_showdown_1.default);
const osrs_1 = __importDefault(require("./routes/osrs"));
exports.app.use('/osrs', osrs_1.default);
const joewatermelon_1 = __importDefault(require("./routes/joewatermelon"));
const raids_1 = require("./utils/osrs/raids");
exports.app.use('/joewatermelon', joewatermelon_1.default);
exports.app.get('/testing', (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, rngBuff } = _req.query;
    const loot = (0, raids_1.raidCox)();
    if (loot.beam === 'purple') {
        _res.send(`${username} enters the Chambers of Xeric. They complete the raid with ${loot.points.toFixed(0)} points. They see a joewatLOOT PURPLE joewatLOOT loot beam! Within the chest they find ${loot.itemName}!`);
    }
    else {
        _res.send(`${username} enters the Chambers of Xeric. They complete the raid with ${loot.points.toFixed(0)} points${loot.didPlank ? ' (what a planker x0r6ztGiggle)' : ''}. They see a white loot beam. Within the chest they find ${loot.itemName}. Never lucky Sadge`);
    }
}));
exports.app.get('/*', (req, res) => {
    console.log('request url: ', req.url);
    console.log('request user query: ', req.query.user);
    res.status(404).send('The page you are looking for does not exist.');
});
exports.app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
