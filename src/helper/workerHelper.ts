import { Document, Model } from 'mongoose';
import { parentPort } from 'worker_threads';
import { connectDb } from '../config/db';
import { TransactionModel } from '../Model/transaction';
import { TaccHistoryModel } from './../Model/TaccHistory'
import { fotmatTac } from '../utils/formatTac';

const saveTransaction = async <T extends Document>(
  SchemaType: Model<T>,
  transactionData: Partial<T>
): Promise<T> => {
  try {
    const savedTransaction = await SchemaType.create(transactionData);
    console.log('Transaction saved to DB:', savedTransaction);
    return savedTransaction;
  } catch (error) {
    console.error('Error saving transaction to DB in worker:', error);
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
    console.log('Database connected in worker');
  } catch (error: any) {
    console.error('Error during worker initialization:', error);
    parentPort?.postMessage({ status: 'error', error: error.message });
  }
})();

parentPort?.on('message', async (message: any) => {
  const { type, data } = message;
  console.log('Message received in worker:', type, data);

  try {
    switch (type) {
      case 'saveTransaction':
        console.log('saveTransaction')
        const savedTransaction = await saveTransaction(TransactionModel, data);
        console.log('saveTransaction 2')
        parentPort?.postMessage({ status: 'success', txData: savedTransaction });
        console.log('Transaction saved and data sent back to main thread:', savedTransaction);
        break;
      case 'TacStake':
        console.log('TacStake')
        const stackTacc = await saveTransaction(TaccHistoryModel, data);
        console.log('TacStake 1')
        console.log({ stackTacc })
        console.log(JSON.stringify(stackTacc, null, 2))
        console.log("Sending to worker:", JSON.stringify(data));
        console.log(JSON.stringify(stackTacc, null, 2));
        const tacResult = fotmatTac(stackTacc)
        console.log({ tacResult })
        parentPort?.postMessage({ status: 'success', txData: tacResult });
        console.log('Transaction saved and data sent back to main thread:', stackTacc);
        break;
      case 'sendEmail':
        console.log('send email')
        // await sendEmailFunction(data);
        parentPort?.postMessage({ status: 'success', txData: 'Email sent' });
        break;

      default:
        parentPort?.postMessage({ status: 'error', error: 'Unknown job type' });
        break;
    }
  } catch (error: any) {
    console.error('Error handling message:', error);
    parentPort?.postMessage({ status: 'error', error: error.message });
  }
});
