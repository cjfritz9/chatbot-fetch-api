"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let db;
const DEV_MODE = process.env.DEV_MODE === 'true';
if (DEV_MODE) {
    const result = fs_1.default.readFileSync(path_1.default.join('src', 'secrets', 'gcp-service-account.json'), 'utf-8');
    const cred = JSON.parse(result);
    (0, app_1.initializeApp)({ credential: (0, app_1.cert)(cred) });
    db = (0, firestore_1.getFirestore)('testing-copy-feb-2-24');
}
else {
    (0, app_1.initializeApp)({ credential: (0, app_1.applicationDefault)() });
    db = (0, firestore_1.getFirestore)();
}
exports.default = db;
