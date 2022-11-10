import express, { Request, Response, NextFunction } from 'express';
import { createReportSolucionated, deleteReportSolucionated } from '../../controllers/reports/reportSolutionatedController';
import { ReportSolutionated } from '../../models/report/reportSolucionated';

const router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    /* #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/reportSolutionated" } } */
    const {...solutionated} = req.body as ReportSolutionated;

    try {
        const result = await createReportSolucionated(solutionated);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});


router.delete('/:_idsolutionated', async (req, res, next) => {
    const { _idsolutionated } = req.params;

    try {
        const result = await deleteReportSolucionated({_id: _idsolutionated});

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
})



export default router;