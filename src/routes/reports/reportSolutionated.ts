import express, { Request, Response, NextFunction } from 'express';
import { createReportSolucionated, deleteReportSolucionated } from '../../controllers/reports/reportSolutionatedController';
import { ReportSolutionated } from '../../models/report/reportSolucionated';

const router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const {...solutionated} = req.body as ReportSolutionated;

    try {
        const result = await createReportSolucionated(solutionated);

        res.json(result).status(200);
    } catch (error) {
        next(error);
    }
});


router.delete('/:_idsolutionated', async (req, res, next) => {
    const { _idsolutionated } = req.params;

    try {
        const result = await deleteReportSolucionated({_id: _idsolutionated});

        res.json(result).status(200);
    } catch (error) {
        next(error);
    }
})



export default router;