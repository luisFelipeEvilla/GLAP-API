import { getModelForClass, ModelOptions, prop, Ref, Severity } from "@typegoose/typegoose";
import { ObjectId } from "mongoose";
import { User } from "./userModel";

@ModelOptions({options: {allowMixed: Severity.ALLOW}})
export class Report {
    _id?: ObjectId

    @prop({ ref: () => User, required: true})
    public user!: Ref<User>;
    
    @prop({ ref: () => User, required: true})
    public provider!: Ref<User>;
    
    @prop({ required: true})
    public description!: string;
    
    @prop({ required: true})
    public geolocation!: GeoJSON.GeoJSON;

    @prop({ default: Date.now()}, )
    public createdAt!: Date;

    @prop({ default: Date.now() })
    public visibleAt!: Date;
}

const reportModel = getModelForClass(Report);

export default reportModel;


