"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TaccController_1 = require("../Controller/TaccController");
const router = express_1.default.Router();
router.get("/tacc", TaccController_1.getAllTacc);
exports.default = router;
