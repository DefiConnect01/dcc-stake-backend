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
        console.log('Transaction saved to DB:', savedTransaction);
        return savedTransaction;
    }
    catch (error) {
        console.error('Error saving transaction to DB in worker:', error);
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
        console.log('Database connected in worker');
    }
    catch (error) {
        console.error('Error during worker initialization:', error);
        worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ status: 'error', error: error.message });
    }
}))();
worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, data } = message;
    console.log('Message received in worker:', type, data);
    try {
        switch (type) {
            case 'saveTransaction':
                console.log('saveTransaction');
                const savedTransaction = yield saveTransaction(transaction_1.TransactionModel, data);
                console.log('saveTransaction 2');
                worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ status: 'success', txData: savedTransaction });
                console.log('Transaction saved and data sent back to main thread:', savedTransaction);
                break;
            case 'TacStake':
                console.log('TacStake');
                const stackTacc = yield saveTransaction(TaccHistory_1.TaccHistoryModel, data);
                console.log('TacStake 1');
                console.log({ stackTacc });
                console.log(JSON.stringify(stackTacc, null, 2));
                console.log("Sending to worker:", JSON.stringify(data));
                console.log(JSON.stringify(stackTacc, null, 2));
                const tacResult = (0, formatTac_1.fotmatTac)(stackTacc);
                console.log({ tacResult });
                worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ status: 'success', txData: tacResult });
                console.log('Transaction saved and data sent back to main thread:', stackTacc);
                break;
            case 'sendEmail':
                console.log('send email');
                // await sendEmailFunction(data);
                worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ status: 'success', txData: 'Email sent' });
                break;
            default:
                worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ status: 'error', error: 'Unknown job type' });
                break;
        }
    }
    catch (error) {
        console.error('Error handling message:', error);
        worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ status: 'error', error: error.message });
    }
}));
