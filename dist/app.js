"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const connectDB_1 = require("./config/connectDB");
const errorHandler_middleware_1 = require("./middlewares/errorHandler-middleware");
const notFound_middleware_1 = require("./middlewares/notFound-middleware");
const auth_route_1 = require("./routes/auth-route");
const jobs_route_1 = require("./routes/jobs-route");
const user_route_1 = require("./routes/user-route");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
app.use((0, morgan_1.default)("dev"));
// SECURITY PACKAGES
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.set("trust proxy", 1);
// ROUTES
app.get("/", (req, res) => {
    res.send(`
  <h1>JobsAPI</h1>
  `);
});
app.use("/api/v1/auth", auth_route_1.AuthRoute);
app.use("/api/v1/user", user_route_1.UserRoute);
app.use("/api/v1/jobs", jobs_route_1.JobsRoute);
// 404 MIDDLEWARE
app.use(notFound_middleware_1.notFoundMiddleware);
// ERROR MIDDLEWARE
app.use(errorHandler_middleware_1.errorHandlerMidlleware);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const port = process.env.PORT || 5001;
    try {
        yield (0, connectDB_1.connectDB)(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server alive: ${port} : DB ESTABLISHED`);
        });
    }
    catch (error) {
        console.log("Something went wrong");
    }
});
start();
