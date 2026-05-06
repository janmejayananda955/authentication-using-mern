import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173"
}))
 
/** require all the routs here */

/** auth routes */
app.use("/api/auth", authRouter);


export default app;