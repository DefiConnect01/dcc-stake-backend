import mongoose, { Schema, Document, Model } from "mongoose";

export enum IStatus {
    PENDING = "Pending",
    COMPLETED = "Completed",
}

export const ACTIONS = ['Stake', 'Unstake'] as const;
export type IAction = typeof ACTIONS[number];


export interface ITacc extends Document {
    address: string;
    token: string;
    amount: string;
    duration: string;
    network: string;
    hash: string;
    action: IAction;
    status: IStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

const TaccSchema = new Schema<ITacc>(
    {
        address: { required: true, type: String },
        token: { required: true, type: String },
        amount: { required: true, type: String },
        duration: { required: true, type: String },
        network: { required: true, type: String },
        hash: { required: true, type: String },
        action: {
            required: true,
            type: String,
            enum: ACTIONS,
            default: ACTIONS[0],
        },
        status: {
            type: String,
            enum: Object.values(IStatus),
            default: IStatus.PENDING,
        },
    },
    {
        timestamps: true,
    }
);


export const TaccHistoryModel: Model<ITacc> =
    mongoose.models.Tacc || mongoose.model<ITacc>("Tacc", TaccSchema);
