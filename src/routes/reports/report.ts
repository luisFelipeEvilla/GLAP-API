import express, { NextFunction, Request, Response } from 'express';
import { createReport, deleteReports, getReports, updateReports } from '../../controllers/reports/reportController';
import { Report } from '../../models/report/reportModel';

import confirmation from './reportConfirmation'; 
import solutionated from './reportSolutionated';

const router = express.Router();

router.use('/:id/confirmation', confirmation );
router.use('/:id/solutionated', solutionated );

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const { index , offset} = req.query as { index: string, offset: string};
    
    try {
        const result = await getReports({visible: true}, parseInt(index), offset ? parseInt(offset) : undefined);

        res.json(result);
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    /* #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/report" } } */

    const {...report} = req.body as Report;

    try {
        const result = await createReport(report);

        res.status(200).json(result);
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
    /* #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/report" } } */
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