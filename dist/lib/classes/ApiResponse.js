"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor(message, error) {
        this.message = message;
        this.error = error;
        if (error) {
            console.error(error);
        }
    }
}
exports.ApiResponse = ApiResponse;
