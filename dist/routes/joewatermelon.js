"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joewatermelon_1 = __importDefault(require("../utils/joewatermelon"));
const joeRouter = express_1.default.Router();
joeRouter.get('/auth', (req, res) => {
    console.log('full request: ', req);
    console.log('request url: ', req.url);
    console.log('request original url: ', req.originalUrl);
    console.log('request body: ', req.body);
    res.send('Success');
});
joeRouter.get('/dog_treat', (_req, res) => {
    res.send((0, joewatermelon_1.default)());
});
exports.default = joeRouter;
console.log('https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=1xkvdpm0d3i7kkfsvcglm29dvv71g4&redirect_uri=http://localhost:3000&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls&state=c3ab8aa609ea11e793ae92361f002671');
