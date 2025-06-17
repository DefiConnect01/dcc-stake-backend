"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCache = void 0;
const cache_1 = require("../config/cache");
const ResponseHandler_1 = require("../helper/ResponseHandler");
const checkCache = (keyGenerator) => (req, res, next) => {
    const baseKey = keyGenerator(req);
    console.log("Checking cache for key:", baseKey);
    const result = cache_1.cache.get(baseKey);
    console.log("Cache result:", result ? "Hit" : "Miss");
    if (result) {
        console.log("Cache hit for:", baseKey);
        return (0, ResponseHandler_1.ResponseHandler)(res, 200, "Cache hit", result);
    }
    req.cacheKey = baseKey;
    console.log("Cache miss, proceeding to handler");
    console.log("Middleware key:", baseKey);
    console.log("Route handler key:", req.cacheKey);
    next();
};
exports.checkCache = checkCache;
