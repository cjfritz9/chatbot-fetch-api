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
exports.updateUser = exports.createUser = exports.getUser = void 0;
const firestore_client_1 = __importDefault(require("./firestore-client"));
const usersSnap = firestore_client_1.default.collection('users');
const getUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = yield usersSnap.doc(username).get();
    if (!docRef.exists) {
        return { doesNotExist: 'No such user exists' };
    }
    else {
        return Object.assign({ username }, docRef.data());
    }
});
exports.getUser = getUser;
const createUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, exports.getUser)(username);
    if (user.doesNotExist) {
        yield usersSnap.doc(username).create({ gp: '0' });
        return {
            username,
            gp: '0'
        };
    }
    else {
        return user;
    }
});
exports.createUser = createUser;
const updateUser = (username, gp) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = yield usersSnap.doc(username).get();
    if (!docRef.exists) {
        return {
            noUserExists: `${username} was not found`
        };
    }
    else {
        yield usersSnap.doc(username).update({ gp });
        return {
            username,
            gp
        };
    }
});
exports.updateUser = updateUser;
