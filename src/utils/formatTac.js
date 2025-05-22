"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTac = formatTac;
var formatSecondsToDays_1 = require("./formatSecondsToDays");
function formatTac(data) {
    return {
        address: data.address,
        token: data.token,
        amount: data.amount,
        duration: (0, formatSecondsToDays_1.formatSecondsToDays)(Number(data.duration)),
        network: data.network,
        hash: data.hash,
        status: data.status,
        action: data.action,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
    };
}
