import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRouter from "./router/auth.route.js"
import userRouter from "./router/user.route.js"
import JobRouter  from "./router/job.routes.js"

export const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter)
app.use("/api/user/", userRouter)
app.use("/api/job", JobRouter)