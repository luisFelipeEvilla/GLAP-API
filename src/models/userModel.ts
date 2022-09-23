import { getModelForClass, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';
import { providerTypes, roles } from "../db/enums";

export class User {
    
    @prop({ required: true })
    public name!: string;

    @prop({ required: true })
    public identification_number!: string;

    @prop({ required: true, unique: true })
    public email!: string;

    @prop({ required: true })
    public password!: string;

    @prop ({ default: roles.person})
    public role!:  roles;

    @prop({  })
    public provider_type!: providerTypes
}

const userModel = getModelForClass(User);

export default userModel;

