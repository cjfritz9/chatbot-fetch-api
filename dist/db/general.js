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
exports.getVipWinner = exports.addVipWinner = void 0;
const firestore_client_1 = __importDefault(require("./firestore-client"));
const vipSnap = firestore_client_1.default.collection('general').doc('vip_rolls');
const getChannelWinnersCol = (channelName) => vipSnap.collection('channels').doc(channelName).collection('winners');
const addVipWinner = (channelName, username) => __awaiter(void 0, void 0, void 0, function* () {
    const winnersCol = getChannelWinnersCol(channelName);
    const winnerSnap = winnersCol.doc(username);
    const winnerDoc = yield winnerSnap.get();
    if (winnerDoc.exists) {
        winnerSnap.update({
            dateCreated: new Date().toUTCString()
        });
    }
    else {
        winnersCol.doc(username).create({
            dateCreated: new Date().toUTCString()
        });
    }
});
exports.addVipWinner = addVipWinner;
const getVipWinner = (channelName, username) => __awaiter(void 0, void 0, void 0, function* () {
    const winnerDoc = yield getChannelWinnersCol(channelName)
        .where('username', '==', username)
        .get();
});
exports.getVipWinner = getVipWinner;
