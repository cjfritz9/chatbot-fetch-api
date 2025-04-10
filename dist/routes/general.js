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
const ApiResponse_1 = require("../lib/classes/ApiResponse");
const latest_yt_media_1 = require("../utils/general/latest_yt_media");
const vip_roll_1 = require("../utils/general/vip_roll");
const generalRouter = express_1.default.Router();
generalRouter.get('/latest_yt_media/:broadcaster', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { broadcaster } = (req === null || req === void 0 ? void 0 : req.params) || {};
    if (!broadcaster) {
        res.send(new ApiResponse_1.ApiResponse('Broadcaster not provided', 'No broadcaster param provided'));
    }
    res.send(yield (0, latest_yt_media_1.getLatestYtMedia)(broadcaster));
}));
generalRouter.get('/vip_roll', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { username } = (req === null || req === void 0 ? void 0 : req.query) || {};
    const channelName = ((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a['x-fossabot-channeldisplayname']) || '';
    if (!channelName) {
        res.send(new ApiResponse_1.ApiResponse('Error - No channel name was supplied', 'Channel name was not found in headers'));
    }
    if (!username) {
        res.send(new ApiResponse_1.ApiResponse('Error - No username was supplied', 'Username was a nullish value'));
    }
    res.send(yield (0, vip_roll_1.getVipRoll)(channelName, username));
}));
exports.default = generalRouter;
