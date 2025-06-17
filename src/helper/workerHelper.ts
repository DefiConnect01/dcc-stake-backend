import { Document, Model } from 'mongoose';
import { parentPort } from 'worker_threads';
import { connectDb } from '../config/db';
import { TransactionModel } from '../Model/transaction';
import { TaccHistoryModel } from './../Model/TaccHistory'
import { formatTac } from '../utils/formatTac';

const saveTransaction = async <T extends Document>(
  SchemaType: Model<T>,
  transactionData: Partial<T>
): Promise<T> => {
  try {
    const savedTransaction = await SchemaType.create(transactionData);
    return savedTransaction;
  } catch (error) {
    throw error;
  }
};
//? npx tsc helper/workerHelper.ts --outDir dist
//? runthis for worker to build npx tsc src/helper/workerHelper.ts --outDir dist
//! npx tsc helper/workerHelper.ts --outDir dist
// tsc workerHelper.ts
//? const worker = new Worker(path.join(__dirname, '../dist/workerHelper.js'));
//Todo compile becuase node.js does not directly support .ts

(async () => {
  try {
    await connectDb();
  } catch (error: any) {
    parentPort?.postMessage({ status: 'error', error: error.message });
  }
})();

parentPort?.on('message', async (message: any) => {
  const { type, data } = message;

  try {
    switch (type) {
      case 'saveTransaction':
        const savedTransaction = await saveTransaction(TransactionModel, data);
        parentPort?.postMessage({ status: 'success', txData: savedTransaction });
        break;
      case 'TacStake':
        const stackTacc = await saveTransaction(TaccHistoryModel, data);
        const tacResult = formatTac(stackTacc)
        parentPort?.postMessage({ status: 'success', txData: tacResult });
        break;
      case 'sendEmail':
        // await sendEmailFunction(data);
        parentPort?.postMessage({ status: 'success', txData: 'Email sent' });
        break;

      default:
        parentPort?.postMessage({ status: 'error', error: 'Unknown job type' });
        break;
    }
  } catch (error: any) {
    parentPort?.postMessage({ status: 'error', error: error.message });
  }
});
