import cors from "cors";
import dotenv from "dotenv";
import { Express, Request, Response, default as express } from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import xss from "xss-clean";
import { connectDB } from "./config/connectDB";
import authenticationMiddleware from "./middlewares/auth.middleware";
import { errorHandlerMidlleware } from "./middlewares/errorHandler.middleware";
import { notFoundMiddleware } from "./middlewares/notFound.middleware";
import { AuthRoute } from "./routes/auth.routes";
import { JobsRoute } from "./routes/jobs.routes";
import { UserRoute } from "./routes/user.routes";
dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

// SECURITY PACKAGES
app.use(helmet());
app.use(cors());
app.use(xss());
app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);

// ROUTES
app.get("/", (req: Request, res: Response) => {
  res.send(`
  <h1>API Docs</h1>
  <a href="/api-docs">See Docs</a>
  `);
});

app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/jobs", authenticationMiddleware, JobsRoute);

// 404 MIDDLEWARE
app.use(notFoundMiddleware);
// ERROR MIDDLEWARE
app.use(errorHandlerMidlleware);

const start = async () => {
  const port = process.env.PORT || 5001;
  try {
    const mongoURL: string = process.env.MONGODB_URI_RECAP!;
    await connectDB(mongoURL);
    app.listen(port, () => {
      console.log(`Server alive: ${port} : DB ESTABLISHED`);
    });
  } catch (error) {
    console.log("Something went wrong");
  }
};

start();
