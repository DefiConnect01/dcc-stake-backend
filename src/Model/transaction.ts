import mongoose, { Schema, Document, Model } from "mongoose";

export enum IStatus {
  PENDING = "Pending",
  COMPLETED = "Completed",
}

export interface ITransaction extends Document {
  sender: string;
  receiver: string;
  token: string;
  amount: string;
  srcChainId: number;
  dstChainId: number;
  transferId: string;
  hash: string;
  status: IStatus;
}

const Transaction = new Schema<ITransaction>(
  {
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    token: { type: String, required: true },
    amount: { type: String, required: true },
    srcChainId: { type: Number, required: true },
    dstChainId: { type: Number, required: true },
    transferId: { type: String, required: true },
    hash: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: Object.values(IStatus),
      default: IStatus.PENDING,
    },
  },
  { timestamps: true }
);

export const TransactionModel: Model<ITransaction> =
  mongoose.model<ITransaction>("Transaction", Transaction);

