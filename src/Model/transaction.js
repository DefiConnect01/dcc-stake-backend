"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = exports.IStatus = void 0;
var mongoose_1 = require("mongoose");
var IStatus;
(function (IStatus) {
    IStatus["PENDING"] = "Pending";
    IStatus["COMPLETED"] = "Completed";
})(IStatus || (exports.IStatus = IStatus = {}));
var Transaction = new mongoose_1.Schema({
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    token: { type: String, required: true },
    amount: { type: String, required: true },
    srcChainId: { type: Number, required: true },
    dstChainId: { type: Number, required: true },
    transferId: { type: String, required: true },
    hash: { type: String, required: true, unique: true },
    status: {
        type: String,
        enum: Object.values(IStatus),
        default: IStatus.PENDING,
    },
}, { timestamps: true });
exports.TransactionModel = mongoose_1.default.model("Transaction", Transaction);
