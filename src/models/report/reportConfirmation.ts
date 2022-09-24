import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "../userModel";
import { Report } from "../report/reportModel";

export class ReportConfirmation {
    @prop({ ref: () => User, required: true })
    public user!: Ref<User>;

    @prop({ ref: () => Report, required: true })
    public report: Ref<Report>; 

    @prop({ default: Date.now()})
    public createdAt!: Date;
}

const ReportConfirmationModel = getModelForClass(ReportConfirmation);

export default ReportConfirmationModel;