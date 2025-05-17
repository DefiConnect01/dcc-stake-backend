import { serviceRepository } from "./serviceRepository";
import { TransactionModel } from "../Model/transaction";
import AsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { ResponseHandler } from "../helper/ResponseHandler";

const repository = serviceRepository(TransactionModel);

export const getAllTransactions = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const tx = await repository.getAll();
    
    if (tx) {
        ResponseHandler(res, 200, 'Success', tx);
    } else {
        ResponseHandler(res, 500, 'Failed to fetch transactions', null);
    }
});


export const createTransactions = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const body = req.body;
    const tx = await repository.createEntity({ ...body });

    if (tx) {
        ResponseHandler(res, 200, 'Transaction created successfully', tx);
    } else {
        ResponseHandler(res, 500, 'Failed to create transaction', null);
    }
});
