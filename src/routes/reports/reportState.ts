import { NextFunction, Router } from "express";
import { createReportState } from "../../controllers/reports/reportStateController";
import { ReportState } from "../../models/report/reportState";

const router = Router();

router.post('/', async (req, res, next) => {
        const { ...reportState } = req.body as ReportState;
        
        try {
            const result = await createReportState(reportState);

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
})

export default router;