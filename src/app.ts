import dotenv from "dotenv";
import { Express, Request, Response, default as express } from "express";
import morgan from "morgan";
import path from "path";
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
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
// SECURITY PACKAGES
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
app.use("/api/v1/jobs", JobsRoute);

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
