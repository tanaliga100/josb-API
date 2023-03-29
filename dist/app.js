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
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const connectDB_1 = require("./config/connectDB");
const authentication_middleware_1 = __importDefault(require("./middlewares/authentication-middleware"));
const errorHandler_middleware_1 = require("./middlewares/errorHandler-middleware");
const notFound_middleware_1 = require("./middlewares/notFound-middleware");
const auth_route_1 = require("./routes/auth-route");
const jobs_route_1 = require("./routes/jobs-route");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use((0, morgan_1.default)("dev"));
// SECURITY PACKAGES
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));
app.set("trust proxy", 1);
// ROUTES
// app.get("/", (req: Request, res: Response) => {
//   res.json({ msg: "Server Alive : Express Ts" });
// });
app.use("/api/v1/auth", auth_route_1.router);
app.use("/api/v1/jobs", authentication_middleware_1.default, jobs_route_1.router);
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
