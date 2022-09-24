import connect from "../db";
import reportModel, { Report } from "../models/reportModel";

export const createReport = async(report: Report) => {
    try {
        await connect();

        const result = await reportModel.create(report); 
        
        if (!result) throw new Error(`Error creating report`);
        
        return result;
    } catch (error) {
        console.log(error);
        if (error instanceof Error) throw error;
    }
}