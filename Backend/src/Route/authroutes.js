import express from "express";
import {register, login} from "../Controller/authcontroller.js"
import { protect } from "../Middleware/authmiddleware.js";

const authroute = express.Router()

authroute.post("/register", register)
authroute.post("/login",login)

export default authroute;