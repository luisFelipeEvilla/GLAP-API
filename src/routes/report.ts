import express, { Request, Response } from 'express';
import { Error as mongooseError } from "mongoose";
import { createReport } from '../controllers/reportController';
import { Report } from '../models/reportModel';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const {...report} = req.body as Report;

    try {
        const result = await createReport(report);

        res.json(result).status(200);
    } catch (error) {
        if (error instanceof mongooseError ) return  res.json(error).status(400)
        if (error instanceof Error) return res.json({error: error.message}).status(500);

        console.log(error);
    }
});

export default router;