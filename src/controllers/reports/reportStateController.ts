import ReportStateModel, { ReportState } from "../../models/report/reportState";
import { updateReports } from "./reportController";


export const createReportState = async (state: ReportState | any) => {
    try {
        const result = await ReportStateModel.create(state);

        // update report state
        await updateReports({ _id: state.report }, { state: state.state });

        return result;
    } catch (error) {
        throw error;
    }
}

// get report state by report id
export const getReportState = async (reportId: string) => {
    try {
        const result = await ReportStateModel.find({ report: reportId });
        
        return result;
    } catch (error) {
        throw error;
    }
}