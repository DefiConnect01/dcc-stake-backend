"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const serviceRepository = (schema) => ({
    createEntity: (entity) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield schema.create(entity);
        }
        catch (error) {
            throw new Error(error instanceof Error ? error.message : "Create failed");
        }
    }),
    getAll: (options) => __awaiter(void 0, void 0, void 0, function* () {
        const { skip = 0, limit = 20 } = options || {};
        try {
            const [data, total] = yield Promise.all([
                schema.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
                schema.countDocuments(),
            ]);
            return { data, total };
        }
        catch (error) {
            throw new Error(error instanceof Error ? error.message : "Get all failed");
        }
    }),
    getSingleById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        if (!mongoose_1.default.isValidObjectId(id)) {
            throw new Error("Not a valid ID");
        }
        try {
            return yield schema.findById(id);
        }
        catch (error) {
            throw new Error(error instanceof Error ? error.message : "Get by ID failed");
        }
    }),
    getSingleEntity: (query) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield schema.findOne(query);
        }
        catch (error) {
            throw new Error(error instanceof Error ? error.message : "Get one failed");
        }
    }),
    updateSingle: (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
        if (!mongoose_1.default.isValidObjectId(id)) {
            throw new Error("Not a valid ID");
        }
        try {
            return yield schema.findByIdAndUpdate(id, updateData, { new: true });
        }
        catch (error) {
            throw new Error(error instanceof Error ? error.message : "Update failed");
        }
    }),
    deleteSingle: (id) => __awaiter(void 0, void 0, void 0, function* () {
        if (!mongoose_1.default.isValidObjectId(id)) {
            throw new Error("Not a valid ID");
        }
        try {
            return yield schema.findByIdAndDelete(id);
        }
        catch (error) {
            throw new Error(error instanceof Error ? error.message : "Delete failed");
        }
    }),
});
exports.serviceRepository = serviceRepository;
