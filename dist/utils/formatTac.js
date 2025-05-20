"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fotmatTac = fotmatTac;
function fotmatTac(data) {
    return {
        address: data.address,
        token: data.token,
        amount: data.amount,
        duration: data.duration,
        network: data.network,
        hash: data.hash,
        status: data.status,
    };
}
