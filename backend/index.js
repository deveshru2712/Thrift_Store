import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectToDb from "./config/Db.js";
import errorHandler from "./middleware/errorHandler.js";
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("hii");
});

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);

app.use(errorHandler);

app.listen(port, () => {
  connectToDb();
  console.log(`The server is running on the port:${port}`);
});
