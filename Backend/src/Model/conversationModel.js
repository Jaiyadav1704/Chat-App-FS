import pool from "../config/db.js";

export const findconversation = async(user1, user2) => {
    const result = await pool.query("SELECT * FROM conversations WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1)", [user1,user2])
    return result.rows[0]
}

export const createconversation = async(user1,user2) => {
    const result = await pool.query("INSERT INTO conversations (user1_id, user2_id) VALUES ($1,$2) RETURNING *", [user1,user2])
    return result.rows[0]
}