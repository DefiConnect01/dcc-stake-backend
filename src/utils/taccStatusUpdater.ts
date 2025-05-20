import cron from "node-cron";
import { TaccHistoryModel, IStatus } from "../Model/TaccHistory";
import { getIO } from "../config/socket";


cron.schedule("*/10 * * * * *", async () => {
  try {
    const pendingTxs = await TaccHistoryModel.find({ status: IStatus.PENDING });

    for (const tx of pendingTxs) {
      tx.status = IStatus.COMPLETED;
      await tx.save();

      const io = getIO();
      io.emit("stake:update", tx);
      console.log(`Updated Tx ${tx._id} to COMPLETED`);
    }
  } catch (err) {
    console.error("Error in cron job for Tacc transactions:", err);
  }
});
