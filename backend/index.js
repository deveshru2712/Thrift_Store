import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import path from "path";

import connectToDb from "./config/Db.js";
import errorHandler from "./middleware/errorHandler.js";
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";

const __dirname = path.resolve();

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
app.use("/api/cart", cartRouter);

app.use((req, res, next) => {
  res.status(404).send("Page not found");
});

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
app.listen(port, () => {
  connectToDb();
  console.log(`The server is running on the port:${port}`);
});
