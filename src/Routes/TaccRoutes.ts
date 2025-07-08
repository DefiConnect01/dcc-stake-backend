import express from "express";
import { getAllTacc } from "../Controller/TaccController";
import { checkCache } from "../Middleware/checkCache";

const router = express.Router();

router.get(
  "/tacc",
  checkCache((req) => {
    const page = req.query.page || "1";
    const limit = req.query.limit || "20";
    return `tac:list:page=${page}:limit=${limit}`;
  }),
  getAllTacc
);

export default router;
