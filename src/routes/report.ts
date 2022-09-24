import express, { NextFunction, Request, Response } from 'express';
import { createReport, createReportSolucionated, deleteReports, deleteReportSolucionated, getReports, updateReports } from '../controllers/reportController';
import { Report } from '../models/report/reportModel';
import { ReportSolutionated } from '../models/report/reportSolucionated';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const { index , offset} = req.query as { index: string, offset: string};
    
    try {
        const result = await getReports({}, parseInt(index), offset ? parseInt(offset) : undefined);

        res.json(result);
    } catch (error) {
        next(error);
    }
})

router.post('/:_id/solutionated', async (req: Request, res: Response, next: NextFunction) => {
    const {...solutionated} = req.body as ReportSolutionated;

    try {
        const result = await createReportSolucionated(solutionated);

        res.json(result).status(200);
    } catch (error) {
        next(error);
    }
});

router.delete('/:_id/solutionated/:_idsolutionated', async (req, res, next) => {
    const { _idsolutionated } = req.params;

    try {
        const result = await deleteReportSolucionated({_id: _idsolutionated});
        
        res.json(result).status(200);
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const {...report} = req.body as Report;

    try {
        const result = await createReport(report);

        res.json(result).status(200);
    } catch (error) {
        next(error);
    }
});

router.delete('/:_id', async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;

    if (!_id || _id === null) return res.json({ error: 'Should pass a _id parameter'});

    try {
        const result = await deleteReports({ _id});

        res.json(`Report with id: ${_id} deleted successfully`).status(200);
    } catch (error) {
        next(error);
    }
})

router.patch('/:_id', async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    const { ...report } = req.body as Report;

    if (!_id || _id === null) return res.json({ error: 'Should pass a _id parameter'});

    try {
        const result = await updateReports({ _id}, report );

        res.json(result).status(200);
    } catch (error) {
        next(error);
    }
})
export default router;