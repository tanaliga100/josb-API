"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const swaggerUI = __importStar(require("swagger-ui-express"));
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
// app.use(express.static(path.join(__dirname, "public")));
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
const swaggerDocs = require("../openapi.json");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(undefined, {
    swaggerOptions: {
        spec: swaggerDocs,
    },
}));
// ROUTES
app.get("/", (req, res) => {
    res.send(`
  <h1>API_DOCS</h1>
  <a href="/api-docs">See Documentation</a>
  `);
});
app.use("/api/v1/auth", auth_route_1.AuthRoute);
app.use("/api/v1/jobs", authentication_middleware_1.default, jobs_route_1.JobsRoute);
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
