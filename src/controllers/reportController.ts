import connect from "../db";
import reportModel, { Report } from "../models/reportModel";
import { DEFAULT_OFFSET } from "../config";

connect();

export const getReports = async (filters = {}, index: number, offset = DEFAULT_OFFSET) => {
    try {
        const result = await reportModel.find(filters).skip(index * offset).limit(offset);

        return result;
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