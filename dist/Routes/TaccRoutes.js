"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TaccController_1 = require("../Controller/TaccController");
const checkCache_1 = require("../Middleware/checkCache");
const router = express_1.default.Router();
router.get("/tacc", (0, checkCache_1.checkCache)((req) => {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    return `tac:list:page=${page}:limit=${limit}`;
}), TaccController_1.getAllTacc);
exports.default = router;
