import dotenv from "dotenv"
dotenv.config()
import { Socket } from "dgram";
import app from "./app.js";
import http from "http"
import {Server} from "socket.io"


const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:"*"
    }
})

io.on("connection",(socket) => {
    console.log("User connected", socket.id);


    socket.on("join", (userId) => {
        socket.join(String(userId));
        console.log(`Socket ${socket.id} joined room ${userId}`)
    })

    socket.on("sendMessage", ({receiverId, conversationId}) => {
        console.log(`Sending realtime update to user ${receiverId}`)
        console.log("Rooms:",io.sockets.adapter.rooms)
        

        io.to(String(receiverId)).emit("receiveMessage", {conversationId})
    })

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id)
    })
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})