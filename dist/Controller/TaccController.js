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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTac = exports.normalizeAction = exports.getAllTacc = void 0;
const serviceRepository_1 = require("../service/serviceRepository");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const ResponseHandler_1 = require("../helper/ResponseHandler");
const TaccHistory_1 = require("../Model/TaccHistory");
const formatTac_1 = require("../utils/formatTac");
const cache_1 = require("../config/cache");
const repository = (0, serviceRepository_1.serviceRepository)(TaccHistory_1.TaccHistoryModel);
exports.getAllTacc = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tx = yield repository.getAll();
    if (tx && Array.isArray(tx)) {
        // console.log(tx);
        const result = tx.map((ab) => (0, formatTac_1.formatTac)(ab));
        if (req.cacheKey) {
            cache_1.cache.set(req.cacheKey, result, 600);
        }
        (0, ResponseHandler_1.ResponseHandler)(res, 200, "Success", result);
    }
    else {
        (0, ResponseHandler_1.ResponseHandler)(res, 500, "Failed to fetch transactions", null);
    }
}));
const normalizeAction = (value) => {
    const formatted = value.trim().toLowerCase();
    if (formatted === "stake")
        return "Stake";
    if (formatted === "unstake")
        return "Unstake";
    return null;
};
exports.normalizeAction = normalizeAction;
exports.createTac = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const normalizedAction = (0, exports.normalizeAction)(body.action);
    if (!normalizedAction) {
        (0, ResponseHandler_1.ResponseHandler)(res, 400, "Invalid action type", null);
        return;
    }
    const tx = yield repository.createEntity(Object.assign(Object.assign({}, body), { action: normalizedAction }));
    if (tx) {
        (0, ResponseHandler_1.ResponseHandler)(res, 200, "Transaction created successfully", tx);
    }
    else {
        (0, ResponseHandler_1.ResponseHandler)(res, 500, "Failed to create transaction", null);
    }
}));
