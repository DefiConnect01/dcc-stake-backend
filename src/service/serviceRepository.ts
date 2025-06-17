import mongoose, { Model, FilterQuery, UpdateQuery, Document } from "mongoose";

export const serviceRepository = <T extends Document>(schema: Model<T>) => ({
  createEntity: async (entity: Partial<T>): Promise<T> => {
    try {
      return await schema.create(entity);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Create failed");
    }
  },

  getAll: async (): Promise<T[]> => {
    try {
      return await schema.find().sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Get all failed"
      );
    }
  },

  getSingleById: async (id: string): Promise<T | null> => {
    if (!mongoose.isValidObjectId(id)) {
      throw new Error("Not a valid ID");
    }
    try {
      return await schema.findById(id);
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Get by ID failed"
      );
    }
  },

  getSingleEntity: async (query: FilterQuery<T>): Promise<T | null> => {
    try {
      return await schema.findOne(query);
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Get one failed"
      );
    }
  },

  updateSingle: async (
    id: string,
    updateData: UpdateQuery<T>
  ): Promise<T | null> => {
    if (!mongoose.isValidObjectId(id)) {
      throw new Error("Not a valid ID");
    }
    try {
      return await schema.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Update failed");
    }
  },

  deleteSingle: async (id: string): Promise<T | null> => {
    if (!mongoose.isValidObjectId(id)) {
      throw new Error("Not a valid ID");
    }
    try {
      return await schema.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Delete failed");
    }
  },
});
