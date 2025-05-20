"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleJob = void 0;
const worker_threads_1 = require("worker_threads");
const path_1 = __importDefault(require("path"));
const taskQueue = [];
let activeWorkers = 0;
const MAX_CONCURRENT_WORKERS = 5;
const handleJob = (data) => {
    return new Promise((resolve, reject) => {
        taskQueue.push({ data, resolve, reject });
        processNextTask();
    });
};
exports.handleJob = handleJob;
const processNextTask = () => {
    if (activeWorkers < MAX_CONCURRENT_WORKERS && taskQueue.length > 0) {
        const { data, resolve, reject } = taskQueue.shift();
        runWorker(data)
            .then(resolve)
            .catch(reject)
            .finally(() => {
            activeWorkers--;
            processNextTask();
        });
    }
};
// /Users/mac/Desktop/folly/dev/abundance_server/src/helper/dist/helper/workerHelper.js
const runWorker = (data) => {
    return new Promise((resolve, reject) => {
        activeWorkers++;
        // const worker = new Worker(path.join(__dirname, '../helper/workerHelper.js'));
        console.log({ path: path_1.default.join(__dirname, '../dist/workerHelper.js') });
        console.log({ path: path_1.default.join(__dirname, '/dist/helper/workerHelper.js') });
        console.log({ path: path_1.default.join(__dirname, '/workerHelper.js') }, 'we are here');
        // const worker = new Worker(path.join(__dirname, '../dist/workerHelper.js'));
        const worker = new worker_threads_1.Worker(path_1.default.join(__dirname, '/workerHelper.js'));
        // const worker = new Worker(path.join(__dirname, '../helper/dist/workerHelper.js'));
        worker.postMessage(data);
        worker.on('message', (result) => {
            if (result.status === 'success') {
                resolve(result.txData);
            }
            else {
                reject(new Error(result.error));
            }
        });
        worker.on('error', (error) => reject(error));
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker exited with code ${code}`));
            }
        });
    });
};
