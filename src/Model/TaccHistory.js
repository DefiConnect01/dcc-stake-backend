"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaccHistoryModel = exports.ACTIONS = exports.IStatus = void 0;
var mongoose_1 = require("mongoose");
var IStatus;
(function (IStatus) {
    IStatus["PENDING"] = "Pending";
    IStatus["COMPLETED"] = "Completed";
})(IStatus || (exports.IStatus = IStatus = {}));
exports.ACTIONS = ['Stake', 'Unstake'];
var TaccSchema = new mongoose_1.Schema({
    address: { required: true, type: String },
    token: { required: true, type: String },
    amount: { required: true, type: String },
    duration: { required: true, type: String },
    network: { required: true, type: String },
    hash: { required: true, type: String },
    action: {
        required: true,
        type: String,
        enum: exports.ACTIONS,
        default: exports.ACTIONS[0],
    },
    status: {
        type: String,
        enum: Object.values(IStatus),
        default: IStatus.PENDING,
    },
}, {
    timestamps: true,
});
exports.TaccHistoryModel = mongoose_1.default.models.Tacc || mongoose_1.default.model("Tacc", TaccSchema);
