import { compareSync } from "bcrypt";
import express, { Request, Response } from "express";
import { Error as mongooseError } from "mongoose";
import { addUser, getUser } from "../controllers/userController";
import { ResourceAlreadyExistsError } from "../Errors/errors";
import { User } from "../models/userModel";
import generateToken from "../utils/generateJWT";

const router = express.Router();

router.post('/signup', async (req: Request, res: Response) => {
    const {...user} =  req.body as User; // parse req.body to user object

    try {
        const result = await addUser(user);

        const token = generateToken(user);

        res.json(token).status(200);
    } catch (error) {     
        if (error instanceof (mongooseError || ResourceAlreadyExistsError) ) return  res.json(error).status(400)
        if (error instanceof Error) res.json({error: error.message}).status(500);
    }
})

router.post('/signin', async (req, res) => {
    const {...user} =  req.body as User;

    try {
        const found = await getUser(user.email);
        
        if (!found) return res.json({error: `User with email ${user.email} not found`}).status(404);
        
        const passwordMatch = compareSync(user.password, found.password);
        
        passwordMatch ? res.json(generateToken(found)) : res.json({error: `Wrong credentials`}).status(400);
    } catch (error) {
        if (error instanceof mongooseError ) return  res.json(error).status(400)
        if (error instanceof Error) res.json({error: error.message}).status(500);
    }
})

export default router;
