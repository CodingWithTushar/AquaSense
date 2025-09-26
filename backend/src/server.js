import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ConnectDB } from "./lib/mongoose.js";
import path from "path";
//Routes
import { AuthRouter } from "./routes/auth.route.js";
import { AdminRouter } from "./routes/admin.route.js";
import { UserRouter } from "./routes/user.route.js";
import { CommonRouter } from "./routes/common.route.js";

configDotenv();

const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve()

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.use("/api/v1/auth" , AuthRouter); 
app.use("/api/v1/admin" , AdminRouter);
app.use("/api/v1/user" , UserRouter);
app.use("/api/v1/all", CommonRouter)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});
}

app.listen(port, () => {
  ConnectDB();
  console.log(`🚀 Server is running at ${port}`);
});
