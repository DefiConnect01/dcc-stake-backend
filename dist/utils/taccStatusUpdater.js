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
const node_cron_1 = __importDefault(require("node-cron"));
const TaccHistory_1 = require("../Model/TaccHistory");
const socket_1 = require("../config/socket");
node_cron_1.default.schedule("*/10 * * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pendingTxs = yield TaccHistory_1.TaccHistoryModel.find({ status: TaccHistory_1.IStatus.PENDING });
        for (const tx of pendingTxs) {
            tx.status = TaccHistory_1.IStatus.COMPLETED;
            yield tx.save();
            const io = (0, socket_1.getIO)();
            io.emit("stake:update", tx);
            console.log(`Updated Tx ${tx._id} to COMPLETED`);
        }
    }
    catch (err) {
        console.error("Error in cron job for Tacc transactions:", err);
    }
}));
