import pool from "../config/db.js";

export const createmessage = async(conversationsId, senderId, message) => {
    const result = await pool.query("INSERT INTO messages(conversation_id, sender_id, message) VALUES ($1,$2,$3) RETURNING *",[conversationsId, senderId,message])
    return result.rows[0]
}

export const getMessagesByConversation = async(conversationsId) => {
    const result = await pool.query("SELECT * FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC", [conversationsId])
    return result.rows;
}