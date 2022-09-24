// report_solucionated

import { ObjectId } from "mongoose";
import connect from "../../db";
import reportSolutionatedModdel, { ReportSolutionated } from "../../models/report/reportSolucionated";

connect();

export const getReportSolucionateds = async ( report: ObjectId | String) : Promise<ReportSolutionated[]> => {
    try {
        const result = await reportSolutionatedModdel.find({report});

        return result;
    } catch (error) {
        throw error;
    }
}

export const createReportSolucionated = async (reportSolucionated: ReportSolutionated) => {
    try {
        const result = await reportSolutionatedModdel.create(reportSolucionated);

        return result;
    } catch (error) {
        throw error;
    }
}

export const deleteReportSolucionated = async (filters: {}) => {
    try {
        const result = await reportSolutionatedModdel.deleteMany(filters);

        return result.deletedCount;
    } catch (error) {
        throw error;
    }
}