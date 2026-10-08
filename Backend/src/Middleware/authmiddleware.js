import jwt from "jsonwebtoken"
import { getUserbyId } from "../Model/userModel.js"

export const protect = async(req,res,next) => {
    try{
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const token = authHeader.split(" ")[1];

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await getUserbyId(decode.id)
        req.user = user
        next()
    } catch(err){
        return res.status(401).json({message:"Invalid token"})
    }
}