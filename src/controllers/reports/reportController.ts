import connect from "../../db";
import reportModel, { Report } from "../../models/report/reportModel";
import { DEFAULT_OFFSET } from "../../config";
import { getReportSolucionateds } from "./reportSolutionatedController";
import { getReportConfirmations } from "./reportConfirmationController";
import userModel from "../../models/userModel";
import { getReportState } from "./reportStateController";

connect();

export const getReports = async (filters = {}, index: number = 0, offset = DEFAULT_OFFSET as number) => {
    try {
        const result = await reportModel.find(filters);
        
        const reports  = JSON.parse(JSON.stringify(result));

        for await (const report of reports) {
            report.reportConfirmations = await getReportConfirmations(report._id);
            report.reportSolutionateds = await getReportSolucionateds(report._id);
            report.states = await getReportState(report._id);
        }

        return reports;

    } catch (error) {
        throw error;
    }
}

export const createReport = async (report: Report) => {
    try {
        const provider = await userModel.findOne({ _id: report.provider });
        
        if (!provider) throw new Error("Error, provider not found");

        report.type = provider.provider_type;

        const result = await reportModel.create(report) as Report;
    
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

export const updateReports = async (filters: {}, report: any) => {
    try {
        const result = await reportModel.updateMany(filters, report);

        return result;
    } catch (error) {
        throw error;
    }
}
