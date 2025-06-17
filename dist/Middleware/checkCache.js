"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCache = void 0;
const cache_1 = require("../config/cache");
const ResponseHandler_1 = require("../helper/ResponseHandler");
const checkCache = (keyGenerator) => (req, res, next) => {
    const baseKey = keyGenerator(req);
    const result = cache_1.cache.get(baseKey);
    if (result) {
        return (0, ResponseHandler_1.ResponseHandler)(res, 200, "Cache hit", result);
    }
    req.cacheKey = baseKey;
    next();
};
exports.checkCache = checkCache;
