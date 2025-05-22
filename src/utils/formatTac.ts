
import { ITacc } from "../Model/TaccHistory";
import { formatSecondsToDays } from "./formatSecondsToDays";

export function formatTac(data: ITacc) {
  return {
    address: data.address,
    token: data.token,
    amount: data.amount,
    duration: formatSecondsToDays(Number(data.duration)),
    network: data.network,
    hash: data.hash,
    status: data.status,
    action: data.action,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}
