import { compareSync } from "bcrypt";
import express, { NextFunction, Request, Response } from "express";
import { addUser, getUser } from "../controllers/userController";
import { User } from "../models/userModel";
import generateToken from "../utils/generateJWT";

const router = express.Router();


router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    /* #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/user" } } */
    const { ...user } = req.body as User; // parse req.body to user object
    
    try {
        const result = await addUser(user);

        result.password = "";

        const token = generateToken(result);

        res.json({ result, token }).status(200);
    } catch (error) {
        next(error);
    }
})

router.post('/signin', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        const result = await getUser(email);

        if (!result) return res.status(404).json({ error: `User with email ${email} not found` });

        const passwordMatch = compareSync(password, result.password);

        if (!passwordMatch) return res.status(400).json({ error: `Wrong credentials` });

        const token = generateToken(result);
        result.password = "";

        return res.send({ result, token });

    } catch (error) {
        next(error);
    }
})

export default router;
