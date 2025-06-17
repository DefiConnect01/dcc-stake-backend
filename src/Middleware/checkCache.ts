import { NextFunction, Request, RequestHandler, Response } from "express";
import { cache } from "../config/cache";
import { ResponseHandler } from "../helper/ResponseHandler";

export interface CacheRequest extends Request {
  cacheKey?: string;
}

type KeyGenerator = (req: CacheRequest) => string;

export const checkCache =
  (
    keyGenerator: KeyGenerator
  ): RequestHandler<any, any, any, any, CacheRequest> =>
  (req: CacheRequest, res: Response, next: NextFunction) => {
    const baseKey = keyGenerator(req);
    const result = cache.get(baseKey);

    if (result) {
      return ResponseHandler(res, 200, "Cache hit", result);
    }

    req.cacheKey = baseKey;
    next();
  };
