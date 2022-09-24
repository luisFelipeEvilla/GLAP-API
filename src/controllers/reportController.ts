import connect from "../db";
import reportModel, { Report } from "../models/report/reportModel";
import { DEFAULT_OFFSET } from "../config";
import reportSolutionatedModdel, { ReportSolutionated } from "../models/report/reportSolucionated";
import { ObjectId } from "mongoose";
import ReportConfirmationModel, { ReportConfirmation } from "../models/report/reportConfirmation";

connect();

export const getReports = async (filters = {}, index: number, offset = DEFAULT_OFFSET) => {
    try {
        const result = await reportModel.find(filters).skip(index * offset).limit(offset);
        
        const reports  = JSON.parse(JSON.stringify(result));

        for await (const report of reports) {
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

// report_solucionated

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

// report confirmation

export const createReportConfirmation = async (confirmation: ReportConfirmation) => {
    try {
        const result = await ReportConfirmationModel.create(confirmation);

        return result;
    } catch (error) {
        throw error;
    }
}

export const deleteReportConfirmation = async (filters: {}) => {
    try {
        const result = await ReportConfirmationModel.deleteMany(filters);

        return result.deletedCount;
    } catch (error) {
        throw error;
    }
}