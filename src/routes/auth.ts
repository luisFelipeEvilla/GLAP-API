import { compareSync } from "bcrypt";
import express, { NextFunction, Request, Response } from "express";
import { Error as mongooseError } from "mongoose";
import { addUser, getUser } from "../controllers/userController";
import { ResourceAlreadyExistsError } from "../Errors/errors";
import { User } from "../models/userModel";
import generateToken from "../utils/generateJWT";

const router = express.Router();

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    const {...data} =  req.body as User; // parse req.body to user object

    try {
        const user = await addUser(data);

        user.password = "";

        const token = generateToken(user);

        res.json({user, token}).status(200);
    } catch (error) {     
        next(error);
    }
})

router.post('/signin', async (req: Request, res: Response, next: NextFunction) => {
    const {...data} =  req.body as User;

    try {
        const user = await getUser(data.email);
        
        if (!user) return res.json({error: `User with email ${data.email} not found`}).status(404);
        
        const passwordMatch = compareSync(data.password, user.password);
        
        if (!passwordMatch) return res.json({error: `Wrong credentials`}).status(400);

        const token = generateToken(user);
        user.password = "";

        return res.send({user, token});

    } catch (error) {
        next(error);
    }
})

export default router;
