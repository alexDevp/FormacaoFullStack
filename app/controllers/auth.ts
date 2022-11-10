import {Request, Response, NextFunction} from 'express';
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import secret from "../config/secret";

const signup = async (req: Request, res: Response, next:NextFunction) => {
    if( !req.body.name || !req.body.email || !req.body.password){
        res.status(400).send({message: "Content cannot be empty"});
        return;
    }

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,8)
    });

    newUser.save((err, user) => {
        if(err) res.status(502).send({message: "Erro", err})
        res.status(200).send({message: "Utilizador criado com sucesso"});
    })
}

const login = async (req: Request, res: Response, next:NextFunction) => {
    if(!req.body.email){
        res.status(400).send({message: "Email cannot be empty"});
        return;
    }
    if(!req.body.password){
        res.status(400).send({message: "Password cannot be empty"});
        return;
    }

    const user = await User.findOne({ where: {email: req.body.email}});
     
    if(!user){
        res.status(204).send({message: "User Not Registered"});
        return;
    }
    
    console.log(user);
     bcrypt.compare(req.body.password, user.password).then((match) => {
         if (!match) {
           res
             .status(400)
             .json({ error: "Wrong Username and Password Combination!" });
         } else {
           const accessToken = jwt.sign({email: user.email, name: user.name, id: user._id}, secret);
    
           res.cookie("access-token", accessToken, {
             maxAge: 60 * 60 * 24 * 30 * 1000,
             httpOnly: true,
           });
           res.status(200).send({message: "Logged In"});
        }
       });
}

export default {signup, login};