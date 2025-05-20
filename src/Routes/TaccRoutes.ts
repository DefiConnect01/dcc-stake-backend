import express from "express";
import { getAllTacc } from "../Controller/TaccController";

const router = express.Router();

router.get("/tacc", getAllTacc);
export default router;
