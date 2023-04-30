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
exports.updateUser = exports.getUser = void 0;
const firestore_client_1 = __importDefault(require("./firestore-client"));
const usersSnap = firestore_client_1.default.collection('users');
const getUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = yield usersSnap.doc(username).get();
    if (docRef.exists) {
        const docData = docRef.data();
        return {
            username: docRef.id,
            gp: docData.gp
        };
    }
    else {
        const user = yield createUser(username);
        return user;
    }
});
exports.getUser = getUser;
const createUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    yield usersSnap.doc(username).create({ gp: '0' });
    const docRef = yield usersSnap.doc(username).get();
    const docData = docRef.data();
    return {
        username: docRef.id,
        gp: docData.gp
    };
});
const updateUser = (username, gp) => __awaiter(void 0, void 0, void 0, function* () {
    const userDoc = usersSnap.doc(username);
    let docRef = yield userDoc.get();
    if (!docRef.exists) {
        yield createUser(username);
        docRef = yield userDoc.get();
    }
    const docData = docRef.data();
    yield usersSnap.doc(username).update({ gp });
    return {
        username: docRef.id,
        gp: docData.gp
    };
});
exports.updateUser = updateUser;
