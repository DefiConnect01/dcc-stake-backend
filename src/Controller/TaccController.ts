import { serviceRepository } from "../service/serviceRepository";
import AsyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../helper/ResponseHandler";
import { IAction, TaccHistoryModel } from "../Model/TaccHistory";
import { formatTac } from "../utils/formatTac";
import { cache, clearCacheByPrefix } from "../config/cache";
import { CacheRequest } from "../Middleware/checkCache";

const repository = serviceRepository(TaccHistoryModel);

// GET /api/transactions?page=2&limit=20

export const getAllTacc = AsyncHandler(
  async (req: CacheRequest, res: Response, next: NextFunction): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const { data, total } = await repository.getAll({ skip, limit });

    const result = data.map((ab) => formatTac(ab));
    const responsePayload = {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      items: result,
    };

    if (req.cacheKey) {
      cache.set(req.cacheKey, responsePayload, 600);
    }

    ResponseHandler(res, 200, "Success", responsePayload);
  }
);

export const normalizeAction = (value: string): IAction | null => {
  const formatted = value.trim().toLowerCase();
  if (formatted === "stake") return "Stake";
  if (formatted === "unstake") return "Unstake";
  return null;
};

export const createTac = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const body = req.body;

    const normalizedAction = normalizeAction(body.action);
    if (!normalizedAction) {
      ResponseHandler(res, 400, "Invalid action type", null);
      return;
    }

    const tx = await repository.createEntity({
      ...body,
      action: normalizedAction,
    });

    if (tx) {
      clearCacheByPrefix("tac:list");
      ResponseHandler(res, 200, "Transaction created successfully", tx);
    } else {
      ResponseHandler(res, 500, "Failed to create transaction", null);
    }
  }
);