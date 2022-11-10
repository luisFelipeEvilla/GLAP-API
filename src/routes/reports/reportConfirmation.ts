import express, { Request, Response, NextFunction }  from "express";
import { createReportConfirmation, deleteReportConfirmation } from "../../controllers/reports/reportConfirmationController";
import { ReportConfirmation } from "../../models/report/reportConfirmation";

const router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    /*#swagger.requestBody = { required: true, schema: { $ref: "#/definitions/reportConfirmation" } } */

    const {...confirmation} = req.body as ReportConfirmation;

    try {
        const result = await createReportConfirmation(confirmation);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

router.delete('/:_idConfirmation', async (req, res, next) => {
    const { _idConfirmation } = req.params;

    try {
        const result = await deleteReportConfirmation({_id: _idConfirmation});
        
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
})

export default router;
