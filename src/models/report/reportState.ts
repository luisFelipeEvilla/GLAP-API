import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { reportState } from "../../db/enums";
import { User } from "../userModel";
import { Report } from "./reportModel";

export class ReportState {
    @prop({ ref: () => Report, required: true })
    public report!: Ref<Report>;

    // provider who solved the report
    @prop({ ref: () => User, required: true})
    public provider!: Ref<User>;

    @prop({ default: ""})
    public comment!: string;

    @prop({ default: Date.now()})
    public createdAt!: Date;

    @prop({ default: reportState.published })
    public state!: reportState;
}

const ReportStateModel = getModelForClass(ReportState);

export default ReportStateModel;
