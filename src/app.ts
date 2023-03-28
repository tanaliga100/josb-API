import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import path from "path";
import { connectDB } from "./config/connectDB";
import { errorHandlerMidlleware } from "./middlewares/errorHandlerMiddleware";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware";
import { router as authRoute } from "./routes/auth-route";
import { router as jobsRoute } from "./routes/jobs-route";

dotenv.config();
console.log(process.env);

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
// ROUTES
// app.get("/", (req: Request, res: Response) => {
//   res.json({ msg: "Server Alive : Express Ts" });
// });
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/jobs", jobsRoute);

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
