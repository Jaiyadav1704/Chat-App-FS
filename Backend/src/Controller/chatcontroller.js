import { findconversation,createconversation } from "../Model/conversationModel.js";
import { getMessagesByConversation, createmessage } from "../Model/messageModel.js";
import pool from "../config/db.js";

export const getUsers = async(req,res) => {
    try{
        const result = await pool.query("SELECT id,name,email FROM users WHERE id != $1", [req.user.id])
        res.json(result.rows)
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

export const startconversation = async(req,res) => {
    try{
        const {userId} = req.body

        const existing = await findconversation(req.user.id, userId)

        if(existing){
            return res.json(existing)
        }

        const conversation = await createconversation(req.user.id, userId)
        res.status(201).json(conversation)
    }catch(err){
        res.status(500).json({Error:err.message})
    }
}

export const sendmessage = async(req,res) => {
    try{
        const {conversationsId, message} = req.body

        const newmessage = await createmessage(conversationsId,req.user.id, message)
        console.log(req.body);
        console.log(conversationsId);
        res.status(201).json(newmessage)
    } catch(err){
        console.error("SEND MESSAGE ERROR:", err);
        res.status(500).json({error:err.message})
    }
}

export const getmessage = async(req,res) => {
    try{
        const {conversationsId} = req.params

        const message = await getMessagesByConversation(conversationsId)
        res.json(message)
    }catch(err){
        res.status(500).json({error:err.message})
    }
}