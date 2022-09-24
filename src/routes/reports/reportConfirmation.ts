import express, { Request, Response, NextFunction }  from "express";
import { createReportConfirmation, deleteReportConfirmation } from "../../controllers/reports/reportConfirmationController";
import { ReportConfirmation } from "../../models/report/reportConfirmation";

const router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const {...confirmation} = req.body as ReportConfirmation;

    try {
        const result = await createReportConfirmation(confirmation);

        res.json(result).status(200);
    } catch (error) {
        next(error);
    }
});

router.delete('/:_idConfirmation', async (req, res, next) => {
    const { _idConfirmation } = req.params;

    try {
        const result = await deleteReportConfirmation({_id: _idConfirmation});
        
        res.json(result).status(200);
    } catch (error) {
        next(error);
    }
})

export default router;
