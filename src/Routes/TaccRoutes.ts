import express from "express";
import { getAllTacc } from "../Controller/TaccController";
import { checkCache, CacheRequest } from "../Middleware/checkCache";

const router = express.Router();

router.get(
  "/tacc",
  checkCache((req: CacheRequest) => {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string) || 20);
    return `tac:list:page=${page}:limit=${limit}`;
  }),
  getAllTacc
);

export default router;