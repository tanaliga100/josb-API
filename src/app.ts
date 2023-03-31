import cors from "cors";
import dotenv from "dotenv";
import { Express, Request, Response, default as express } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import * as swaggerUI from "swagger-ui-express";
import { connectDB } from "./config/connectDB";
import authenticationMiddleware from "./middlewares/authentication-middleware";
import { errorHandlerMidlleware } from "./middlewares/errorHandler-middleware";
import { notFoundMiddleware } from "./middlewares/notFound-middleware";
import { router as authRoute } from "./routes/auth-route";
import { router as jobsRoute } from "./routes/jobs-route";
dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));

// SECURITY PACKAGES
app.use(helmet());
app.use(cors());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);
app.set("trust proxy", 1);
const swaggerDocs = require("../openapi.json");
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(undefined, {
    swaggerOptions: {
      spec: swaggerDocs,
    },
  })
);
// ROUTES
app.get("/", (req: Request, res: Response) => {
  res.send(`
  <h1>API_DOCS</h1>
  <a href="/api-docs">See Documentation</a>
  `);
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/jobs", authenticationMiddleware, jobsRoute);

// 404 MIDDLEWARE
app.use(notFoundMiddleware);
// ERROR MIDDLEWARE
app.use(errorHandlerMidlleware);

const start = async () => {
  const port = process.env.PORT || 5001;
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server alive: ${port} : DB ESTABLISHED`);
    });
  } catch (error) {
    console.log("Something went wrong");
  }
};

start();
