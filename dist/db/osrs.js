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
exports.addRng = exports.updateUser = exports.createUser = exports.getUser = void 0;
const firestore_client_1 = __importDefault(require("./firestore-client"));
const usersSnap = firestore_client_1.default.collection('users');
const getUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = yield usersSnap.doc(username).get();
    if (!docRef.exists)
        return;
    const docData = docRef.data();
    return {
        username: docRef.id,
        gp: docData.gp,
        rngBuff: docData.rngBuff
    };
});
exports.getUser = getUser;
const createUser = (username, gp, loot) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield usersSnap
        .doc(username)
        .create({ gp: gp ? gp : '0', lootEntries: loot ? [loot] : [] });
    const docRef = yield usersSnap.doc(username).get();
    const docData = docRef.data();
    console.log('create user response: ', res);
    console.log('user doc ref: ', docRef);
    console.log('user doc data: ', docData);
    return {
        username: docRef.id,
        gp: docData.gp
    };
});
exports.createUser = createUser;
const updateUser = (username, gp, itemInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = yield usersSnap.doc(username).get();
    if (!docRef.exists) {
        const user = yield (0, exports.createUser)(username, gp, itemInfo);
        return user;
    }
    else {
        const docData = docRef.data();
        yield usersSnap.doc(username).update({
            gp,
            lootEntries: [...docData.lootEntries, itemInfo],
            rngBuff: 0
        });
        return {
            username: docRef.id,
            gp: docData.gp
        };
    }
});
exports.updateUser = updateUser;
const addRng = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = yield usersSnap.doc(username).get();
    if (docRef.exists) {
        let { rngBuff } = docRef.data();
        if (!rngBuff)
            rngBuff = 0;
        if (rngBuff < 2) {
            rngBuff += 1;
            yield usersSnap.doc(username).update({ rngBuff });
            return { success: `${username} now has a +${rngBuff} RNG buff!` };
        }
        else {
            return {
                error: `Silly ${username}, you're already at max RNG! (No RNG added)`
            };
        }
    }
    else {
        yield (0, exports.createUser)(username);
        yield usersSnap.doc(username).update({ rngBuff: 1 });
        return { success: `${username} now has a +${1} RNG buff!` };
    }
});
exports.addRng = addRng;
