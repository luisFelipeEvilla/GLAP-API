import connect from "../db";
import userModel, { User } from "../models/userModel";

export const addUser = async(user: User) => {
    await connect();
    
    try {
        const result = await userModel.create(user);
        return result;
    } catch (error) {
        throw error;
    }
}