import connect from "../../db";
import reportModel, { Report } from "../../models/report/reportModel";
import { DEFAULT_OFFSET } from "../../config";
import { getReportSolucionateds } from "./reportSolutionatedController";
import { getReportConfirmations } from "./reportConfirmationController";

connect();

export const getReports = async (filters = {}, index: number = 0, offset = DEFAULT_OFFSET as number) => {
    try {
        const result = await reportModel.find(filters);
        
        const reports  = JSON.parse(JSON.stringify(result));

        for await (const report of reports) {
            report.reportConfirmations = await getReportConfirmations(report._id);
            report.reportSolutionateds = await getReportSolucionateds(report._id);
        }

        return reports;

    } catch (error) {
        throw error;
    }
}

export const createReport = async (report: Report) => {
    try {
        const result = await reportModel.create(report);

        if (!result) throw new Error(`Error creating report`);

        return result;
    } catch (error) {
        if (error instanceof Error) throw error;
    }
}

export const deleteReports = async (filters: {}) => {
    try {
        const result = await reportModel.deleteOne(filters);

        return result.deletedCount;
    } catch (error) {
        throw error;
    }
}

export const updateReports = async (filters: {}, report: Report) => {
    try {
        const result = await reportModel.updateMany(filters, report);

        return result;
    } catch (error) {
        throw error;
    }
}
