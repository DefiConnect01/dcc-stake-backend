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
    console.log("Checking cache for key:", baseKey);
    const result = cache.get(baseKey);
    console.log("Cache result:", result ? "Hit" : "Miss");

    if (result) {
      console.log("Cache hit for:", baseKey);
      return ResponseHandler(res, 200, "Cache hit", result);
    }

    req.cacheKey = baseKey;
    console.log("Cache miss, proceeding to handler");
    console.log("Middleware key:", baseKey);
    console.log("Route handler key:", req.cacheKey);
    next();
  };
