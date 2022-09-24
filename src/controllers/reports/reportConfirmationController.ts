// report confirmation

import { ObjectId } from "mongoose";
import connect from "../../db";
import ReportConfirmationModel, { ReportConfirmation } from "../../models/report/reportConfirmation";

connect();

export const getReportConfirmations = async (report : ObjectId | String) => {
    try {
        const result = await ReportConfirmationModel.find({report});

        return result;
    } catch (error) {
        throw error;
    }
}

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