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
exports.updateLastDog = exports.getLastDog = void 0;
const firestore_1 = require("firebase-admin/firestore");
const firestore_client_1 = __importDefault(require("./firestore-client"));
const docSnap = firestore_client_1.default.collection('joewatermelon').doc('dog_treats');
const getLastDog = () => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = yield docSnap.get();
    if (!docRef.exists) {
        return { error: 'Database error - contact wandernaut#2205' };
    }
    else {
        return docRef.data();
    }
});
exports.getLastDog = getLastDog;
const updateLastDog = (lastDog) => {
    docSnap.update({ lastDog });
    if (lastDog === 0) {
        docSnap.update({ finnCount: firestore_1.FieldValue.increment(1) });
    }
    else if (lastDog === 1) {
        docSnap.update({ tillyCount: firestore_1.FieldValue.increment(1) });
    }
    else if (lastDog === 2) {
        docSnap.update({ zippyCount: firestore_1.FieldValue.increment(1) });
    }
    else {
        docSnap.update({
            invalidNumberError: firestore_1.FieldValue.arrayUnion(`Received invalid id: ${lastDog}. ${new Date().toUTCString()}`)
        });
    }
};
exports.updateLastDog = updateLastDog;
