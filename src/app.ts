import cors from "cors";
import dotenv from "dotenv";
import { Express, Request, Response, default as express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./config/connectDB";
import { errorHandlerMidlleware } from "./middlewares/errorHandler-middleware";
import { notFoundMiddleware } from "./middlewares/notFound-middleware";
import { AuthRoute } from "./routes/auth-route";
import { JobsRoute } from "./routes/jobs-route";
import { UserRoute } from "./routes/user-route";
dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));

// SECURITY PACKAGES
app.use(helmet());
app.use(cors());

app.set("trust proxy", 1);
// ROUTES
app.get("/", (req: Request, res: Response) => {
  res.send(`
  <h1>JobsAPI</h1>
  `);
});

app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/jobs", JobsRoute);

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
