import express from "express";
import { getAllTacc } from "../Controller/TaccController";
import { checkCache } from "../Middleware/checkCache";

const router = express.Router();

router.get("/tacc",checkCache(req=>`tac:list`), getAllTacc);
export default router;
