import express from "express"
import { getUsers,startconversation, getmessage, sendmessage } from "../Controller/chatcontroller.js"
import { protect } from "../Middleware/authmiddleware.js"

const chatroute = express.Router()

chatroute.get("/users", protect,getUsers)
chatroute.post("/conversations", protect,startconversation)
chatroute.post("/message", protect,sendmessage)
chatroute.get("/messages/:conversationsId", protect,getmessage)

export default chatroute;