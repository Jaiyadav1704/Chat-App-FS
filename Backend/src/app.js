import express from "express";
import authroute from "../src/Route/authroutes.js"
import chatroute from "../src/Route/chatroutes.js"
import cors from "cors"

const app = express()

app.use(cors());
app.use(express.json())

app.use("/api/auth", authroute)
app.use("/api/chat", chatroute)

export default app;
