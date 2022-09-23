import express, { Request, Response } from "express";
import { Error as mongooseError } from "mongoose";
import { addUser } from "../controllers/userController";
import { User } from "../models/userModel";

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const {...user} =  req.body as User;

    try {
        const result = await addUser(user);
        
        res.send(result);
    } catch (error) {
        if (error instanceof mongooseError) return  res.json(error).status(400)
        if (error instanceof Error)  res.json(error.message).status;
    }

})

export default router;
