import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "../userModel";
import { Report } from "./reportModel";

export class ReportSolutionated {
    @prop({ ref: () => Report, required: true })
    public report!: Ref<Report>;

    @prop({ ref: () => User, required: true})
    public user!: Ref<User>;

    @prop({ default: Date.now()})
    public createdAt!: Date;
}

const ReportSolutionatedModdel = getModelForClass(ReportSolutionated);

export default ReportSolutionatedModdel;
