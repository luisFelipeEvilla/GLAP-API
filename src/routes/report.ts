import express, { Request, Response } from 'express';
import { Error as mongooseError } from "mongoose";
import { createReport, deleteReports } from '../controllers/reportController';
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

        console.error(error);
    }
});

router.delete('/:_id', async (req, res) => {
    const { _id } = req.params;

    if (!_id || _id === null) return res.json({ error: 'Should pass a _id parameter'});

    try {
        const result = await deleteReports({ _id});

        res.json(`Report with id: ${_id} deleted successfully`).status(200);
    } catch (error) {
        if (error instanceof mongooseError ) return  res.json(error).status(400)
        if (error instanceof Error) return res.json({error: error.message}).status(500);

        console.error(error);
    }
})

export default router;