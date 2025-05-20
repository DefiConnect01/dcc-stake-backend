"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHandler = ResponseHandler;
function ResponseHandler(res, status, message, data = null) {
    res.status(status).json({
        success: status < 400,
        status,
        message,
        data,
    });
}
