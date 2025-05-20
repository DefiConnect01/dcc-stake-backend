import mongoose, { Schema } from "mongoose";

export enum IStatus {
    PENDING = "Pending",
    COMPLETED = "Completed",
}

export type ITacc = {
    address: string;
    token: string;
    amount: string;
    duration: string;
    network: string;
    hash: string;
    status: IStatus;
};

const TaccSchema = new Schema<ITacc>(
    {
        address: { required: true, type: String },
        token: { required: true, type: String },
        amount: { required: true, type: String },
        duration: { required: true, type: String },
        network: { required: true, type: String },
        hash: { required: true, type: String },
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

export const TaccHistoryModel =
    mongoose.models.Tacc || mongoose.model<ITacc>("Tacc", TaccSchema);
