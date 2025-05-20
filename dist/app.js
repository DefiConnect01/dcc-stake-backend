"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = require("./config/db");
const path_1 = __importDefault(require("path"));
const socket_1 = require("./config/socket");
const allowedOrigins_1 = require("./config/allowedOrigins");
const TaccRoutes_1 = __importDefault(require("./Routes/TaccRoutes"));
console.log({ path: path_1.default.join(__dirname, '../dist/workerHelper.js') });
// console.log("UUID:", crypto.randomUUID());
// console.log("Random Bytes (hex):", crypto.randomBytes(256).toString("hex"));
const app = (0, express_1.default)();
const port = 3000;
const server = http_1.default.createServer(app);
(0, socket_1.initializeSocket)(server);
const corsConfig = {
    origin: allowedOrigins_1.allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use((0, cors_1.default)(corsConfig));
app.use((0, morgan_1.default)("tiny"));
app.disable("x-powered-by");
app.set("trust proxy", true);
app.use(express_1.default.json());
// app.use(express.static("public"));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.get("/", (req, res) => {
    res.send("first server!");
});
app.use("/api/", TaccRoutes_1.default);
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong" });
});
(0, db_1.connectDb)()
    .then(() => {
    server.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
})
    .catch((error) => console.log("Invalid database connection: ", error))
    .finally(() => console.log("yes we run finally"));
