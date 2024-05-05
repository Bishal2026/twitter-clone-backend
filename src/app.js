import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(express.urlencoded({ extended: true, limit: "20kb" }));

const coreOrigin = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(coreOrigin));

app.use(express.static("public"));

app.use(cookieParser());

//user routes
import userRouter from "./routers/user.routers.js";
app.use("/api/v1/user", userRouter);

//tweetRouter
import tweetRouter from "./routers/tweet.routers.js";

app.use("/api/v1/tweet", tweetRouter);

export default app;
