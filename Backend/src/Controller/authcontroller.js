import bcrypt, { hash } from "bcryptjs";
import { createUser, getUserbyEmail,getUserbyId } from "../Model/userModel.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async(req,res) => {
    try {
        const {name,email,password} = req.body

        const existinguser = await getUserbyEmail(email);
        if(existinguser){
            return res.status(400).json({message:"User already exist"})
        }

        const hashpassword = await bcrypt.hash(password,10)

        const user = await createUser(name,email,hashpassword)

        const token = generateToken(user.id);

        res.status(201).json({
            id:user.id,
            name:user.name,
            email:user.email,
            token
        })
    } catch (err){
        return res.status(500).json({error: err.message})
    }
}

export const login = async(req,res) => {
    try{
        const { email, password} = req.body

        const user = await getUserbyEmail(email)
        if(!user){
            return res.status(400).json({message:"User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message:"Invalid credentails"})
        }

        const token = generateToken(user.id)
        res.status(201).json({
            id:user.id,
            name:user.name,
            email:user.email,
            token
        })
    } catch (err){
        return res.status(500).json({error: err.message})
    }
}