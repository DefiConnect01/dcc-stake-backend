import { serviceRepository } from "./serviceRepository";
import AsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { ResponseHandler } from "../helper/ResponseHandler";
import { TaccHistoryModel } from "../Model/TaccHistory";

const repository = serviceRepository(TaccHistoryModel);

export const getAllTacc = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const tx = await repository.getAll();
    
    if (tx) {
        ResponseHandler(res, 200, 'Success', tx);
    } else {
        ResponseHandler(res, 500, 'Failed to fetch transactions', null);
    }
});


export const createTac = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const body = req.body;
    const tx = await repository.createEntity({ ...body });

    if (tx) {
        ResponseHandler(res, 200, 'Transaction created successfully', tx);
    } else {
        ResponseHandler(res, 500, 'Failed to create transaction', null);
    }
});
