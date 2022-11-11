import ReportStateModel, { ReportState } from "../../models/report/reportState";


export const createReportState = async (state: ReportState) => {
    try {
        const result = await ReportStateModel.create(state);

        return result;
    } catch (error) {
        throw error;
    }
}