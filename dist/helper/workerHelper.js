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
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const db_1 = require("../config/db");
const transaction_1 = require("../Model/transaction");
const TaccHistory_1 = require("./../Model/TaccHistory");
const formatTac_1 = require("../utils/formatTac");
const saveTransaction = (SchemaType, transactionData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savedTransaction = yield SchemaType.create(transactionData);
        return savedTransaction;
    }
    catch (error) {
        throw error;
    }
});
//? npx tsc helper/workerHelper.ts --outDir dist
//? runthis for worker to build npx tsc src/helper/workerHelper.ts --outDir dist
//! npx tsc helper/workerHelper.ts --outDir dist
// tsc workerHelper.ts
//? const worker = new Worker(path.join(__dirname, '../dist/workerHelper.js'));
//Todo compile becuase node.js does not directly support .ts
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectDb)();
    }
    catch (error) {
        worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ status: 'error', error: error.message });
    }
}))();
worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, data } = message;
    try {
        switch (type) {
            case 'saveTransaction':
                const savedTransaction = yield saveTransaction(transaction_1.TransactionModel, data);
                worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ status: 'success', txData: savedTransaction });
                break;
            case 'TacStake':
                const stackTacc = yield saveTransaction(TaccHistory_1.TaccHistoryModel, data);
                const tacResult = (0, formatTac_1.formatTac)(stackTacc);
                worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ status: 'success', txData: tacResult });
                break;
            case 'sendEmail':
                // await sendEmailFunction(data);
                worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ status: 'success', txData: 'Email sent' });
                break;
            default:
                worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ status: 'error', error: 'Unknown job type' });
                break;
        }
    }
    catch (error) {
        worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ status: 'error', error: error.message });
    }
}));
