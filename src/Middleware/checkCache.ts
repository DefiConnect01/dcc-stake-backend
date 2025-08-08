import { NextFunction, Request, RequestHandler, Response } from "express";
import { cache } from "../config/cache";
import { ResponseHandler } from "../helper/ResponseHandler";

export interface CacheRequest extends Request {
  cacheKey?: string;
  query: any; // Explicitly define query property
  params: any; // Explicitly define params property
  body: any; // Explicitly define body property
}

type KeyGenerator = (req: CacheRequest) => string;

export const checkCache = (
  keyGenerator: KeyGenerator
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Cast the request to CacheRequest
    const cacheReq = req as CacheRequest;
    const baseKey = keyGenerator(cacheReq);
    const result = cache.get(baseKey);

    if (result) {
      return ResponseHandler(res, 200, "Cache hit", result);
    }

    cacheReq.cacheKey = baseKey;
    next();
  };
};