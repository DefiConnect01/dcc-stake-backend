import { ITacc } from "../Model/TaccHistory";

export function fotmatTac(data:ITacc){
    return {
        address: data.address,
            token: data.token,
            amount: data.amount,
            duration: data.duration,
            network: data.network,
            hash: data.hash,
            status: data.status,
            action: data.action,
    }
}