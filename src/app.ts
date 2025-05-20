import dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response } from "express";
import http from "http";
import { Server, Socket } from "socket.io";

import cors from "cors";
import morgan from "morgan";
import { connectDb } from "./config/db";
import path from "path";
import crypto from "crypto";
import { initializeSocket} from './config/socket'
import { allowedOrigins } from "./config/allowedOrigins";
import  TaccRoutes   from './Routes/TaccRoutes'

  console.log({path:path.join(__dirname, '../dist/workerHelper.js')})

// console.log("UUID:", crypto.randomUUID());
// console.log("Random Bytes (hex):", crypto.randomBytes(256).toString("hex"));

const app = express();
const port = 3000;

const server = http.createServer(app);

initializeSocket(server)
const corsConfig = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsConfig));
app.use(morgan("tiny"));
app.disable("x-powered-by");
app.set("trust proxy", true);
app.use(express.json());
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req: Request, res: Response) => {
  res.send("first server!");
});
app.use("/api/", TaccRoutes);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
);



connectDb()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log("Invalid database connection: ", error))
  .finally(() => console.log("yes we run finally"));
