import { serviceRepository } from "./serviceRepository";
import AsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { ResponseHandler } from "../helper/ResponseHandler";
import { IAction, TaccHistoryModel } from "../Model/TaccHistory";
import { formatTac } from "../utils/formatTac";

const repository = serviceRepository(TaccHistoryModel);

export const getAllTacc = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const tx = await repository.getAll();
    
    if (tx && Array.isArray(tx)) {
        // console.log(tx);
        const result = tx.map((ab) => formatTac(ab));
        ResponseHandler(res, 200, 'Success', result); 
    } else {
        ResponseHandler(res, 500, 'Failed to fetch transactions', null);
    }
});



export const normalizeAction = (value: string): IAction | null => {
    const formatted = value.trim().toLowerCase();
    if (formatted === 'stake') return 'Stake';
    if (formatted === 'unstake') return 'Unstake';
    return null;
};

export const createTac = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const body = req.body;


    const normalizedAction = normalizeAction(body.action);
    if (!normalizedAction) {
        ResponseHandler(res, 400, 'Invalid action type', null);
        return;
    }

    const tx = await repository.createEntity({ ...body, action: normalizedAction });

    if (tx) {
        ResponseHandler(res, 200, 'Transaction created successfully', tx);
    } else {
        ResponseHandler(res, 500, 'Failed to create transaction', null);
    }
});
