import express, { Request, Response } from "express";
import { Error as mongooseError } from "mongoose";
import { addUser } from "../controllers/userController";
import { ResourceAlreadyExistsError } from "../Errors/errors";
import { User } from "../models/userModel";
import generateToken from "../utils/generateJWT";

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const {...user} =  req.body as User;

    try {
        const result = await addUser(user);

        const token = generateToken(user);

        res.json(token).status(200);
    } catch (error) {     
        if (error instanceof (mongooseError || ResourceAlreadyExistsError) ) return  res.json(error).status(400)
        if (error instanceof Error) res.json({error: error.message}).status(500);
    }
})

export default router;
