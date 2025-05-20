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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var worker_threads_1 = require("worker_threads");
var db_1 = require("../config/db");
var transaction_1 = require("../Model/transaction");
var TaccHistory_1 = require("./../Model/TaccHistory");
var formatTac_1 = require("../utils/formatTac");
var saveTransaction = function (SchemaType, transactionData) { return __awaiter(void 0, void 0, void 0, function () {
    var savedTransaction, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, SchemaType.create(transactionData)];
            case 1:
                savedTransaction = _a.sent();
                console.log('Transaction saved to DB:', savedTransaction);
                return [2 /*return*/, savedTransaction];
            case 2:
                error_1 = _a.sent();
                console.error('Error saving transaction to DB in worker:', error_1);
                throw error_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
//? npx tsc helper/workerHelper.ts --outDir dist
//? runthis for worker to build npx tsc src/helper/workerHelper.ts --outDir dist
//! npx tsc helper/workerHelper.ts --outDir dist
// tsc workerHelper.ts
//? const worker = new Worker(path.join(__dirname, '../dist/workerHelper.js'));
//Todo compile becuase node.js does not directly support .ts
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, db_1.connectDb)()];
            case 1:
                _a.sent();
                console.log('Database connected in worker');
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error('Error during worker initialization:', error_2);
                worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ status: 'error', error: error_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })();
worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var type, data, _a, savedTransaction, stackTacc, tacResult, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                type = message.type, data = message.data;
                console.log('Message received in worker:', type, data);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 9, , 10]);
                _a = type;
                switch (_a) {
                    case 'saveTransaction': return [3 /*break*/, 2];
                    case 'TacStake': return [3 /*break*/, 4];
                    case 'sendEmail': return [3 /*break*/, 6];
                }
                return [3 /*break*/, 7];
            case 2:
                console.log('saveTransaction');
                return [4 /*yield*/, saveTransaction(transaction_1.TransactionModel, data)];
            case 3:
                savedTransaction = _b.sent();
                console.log('saveTransaction 2');
                worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ status: 'success', txData: savedTransaction });
                console.log('Transaction saved and data sent back to main thread:', savedTransaction);
                return [3 /*break*/, 8];
            case 4:
                console.log('TacStake');
                return [4 /*yield*/, saveTransaction(TaccHistory_1.TaccHistoryModel, data)];
            case 5:
                stackTacc = _b.sent();
                console.log('TacStake 1');
                console.log({ stackTacc: stackTacc });
                console.log(JSON.stringify(stackTacc, null, 2));
                console.log("Sending to worker:", JSON.stringify(data));
                console.log(JSON.stringify(stackTacc, null, 2));
                tacResult = (0, formatTac_1.fotmatTac)(stackTacc);
                console.log({ tacResult: tacResult });
                worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ status: 'success', txData: tacResult });
                console.log('Transaction saved and data sent back to main thread:', stackTacc);
                return [3 /*break*/, 8];
            case 6:
                console.log('send email');
                // await sendEmailFunction(data);
                worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ status: 'success', txData: 'Email sent' });
                return [3 /*break*/, 8];
            case 7:
                worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ status: 'error', error: 'Unknown job type' });
                return [3 /*break*/, 8];
            case 8: return [3 /*break*/, 10];
            case 9:
                error_3 = _b.sent();
                console.error('Error handling message:', error_3);
                worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ status: 'error', error: error_3.message });
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); });
