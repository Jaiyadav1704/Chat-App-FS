import { useEffect, useState } from "react";
import API from "../Services/api";
import socket from "../socket";

import "./Chat.css"

function Chat() {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [conversation, setConversation] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")

    const currentUser = JSON.parse(
        localStorage.getItem("user")
    );

    const handleUserClick = async(user) => {
        try{
            setSelectedUser(user)

            const response = await API.post(
                "/chat/conversations",
                {
                    userId: user.id
                }
            )

            setConversation(response.data)
            console.log(response.data);
            fetchMessages(response.data.id)
        }catch(err){
            console.log(err)
        }
    }

    const handleSendMessage = async() => {
        if(!newMessage.trim()) return;

        try{
            await API.post(
                "/chat/message",
                {
                    conversationsId: conversation.id,
                    message: newMessage
                }
            );
            fetchMessages(conversation.id)

            socket.emit("sendMessage", {
                receiverId: selectedUser.id,
                conversationId: conversation.id
            })
            
            setNewMessage("")
        }catch(err){
            console.log(err)
        }
    }

    const fetchMessages = async(conversationsId) => {
        try{
            const response = await API.get(
                `/chat/messages/${conversationsId}`
            )

            setMessages(response.data)
        }catch(err){
            console.log(err)
        }
    }

    const fetchUsers = async() => {
        try{
            const response = await API.get("/chat/users")

            setUsers(response.data)
        } catch(err){
            console.log(err)
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/";
    }

    useEffect(() => {
        fetchUsers();

        const interval = setInterval(fetchUsers, 20000);

        const onFocus = () => fetchUsers();

        window.addEventListener("focus", onFocus);

        return () => {
            clearInterval(interval);
            window.removeEventListener("focus", onFocus);
        };
    }, []);

    useEffect(() => {
        const join = () => socket.emit("join", currentUser.id);

        if(socket.connected) join();
        socket.on("connect", join);

        return () => {
            socket.off("connect", join);
        };
    },[])

    useEffect(() => {
            const handleReceiveMessage = (data) => {
                if(conversation && conversation.id === data.conversationId){
                    fetchMessages(data.conversationId)
                }
            }
            socket.on("receiveMessage", handleReceiveMessage)
            return () => {
                socket.off("receiveMessage", handleReceiveMessage)
            }
        },[conversation])

        // Fallback: refresh the open conversation every 5s in case a socket event is missed
        useEffect(() => {
            if(!conversation) return;

            const interval = setInterval(() => fetchMessages(conversation.id), 5000);
            return () => clearInterval(interval);
        },[conversation])


    return(
        <div className="chat-container">

            <div className="sidebar">
                <div className="sidebar-header">
                    <h2>Chats</h2>

                    <button onClick={handleLogout}>Logout</button>
                </div>
                {
                    users.map((user) => (
                        <div key={user.id}
                            className="user-item"
                            onClick={() => handleUserClick(user)}>
                                {user.name}
                        </div>
                    ))
                }
            </div>

            <div className="chat-area">
                {
                    selectedUser ? (
                        <>
                        <div className="chat-header">
                            <h3>{selectedUser.name}</h3> 
                        </div>
                        
                        <div className="messages">
                            {
                                messages.map((msg) => (
                                    <div
                                    key={msg.id}
                                    className={
                                        Number(msg.sender_id) === Number(currentUser.id)
                                        ? "my-message" : "other-message"
                                    }>
                                        {msg.message}
                                    </div>
                                ))
                            }
                        </div>

                        <div className="message-input">
                            <input 
                            type="text"
                            placeholder="Type message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if(e.key == "Enter"){
                                    handleSendMessage()
                                }
                            }}
                            />
                            <button onClick={handleSendMessage}>Send</button>
                        </div>
                        </>
                    ) : (
                        <div className="no-chat">
                            Select a user start chating
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Chat;