"use strict";
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
const hunt_showdown_1 = __importDefault(require("./routes/hunt_showdown"));
exports.app.use('/hunt_showdown', hunt_showdown_1.default);
const osrs_1 = __importDefault(require("./routes/osrs"));
exports.app.use('/hunt_showdown', osrs_1.default);
exports.app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
