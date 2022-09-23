import connect from "../db";
import { ResourceAlreadyExistsError } from "../Errors/errors";
import userModel, { User } from "../models/userModel";

export const addUser = async (user: User) => {
    await connect();

    try {
        const found = await getUser(user.email);

        if (found) throw new ResourceAlreadyExistsError(`Error, user ${user.email} already exists`);
        const result = await userModel.create(user);

        return result;
    } catch (error) {
        throw error;
    }
}


export const getUser = async (email: String): Promise<User | null> => {
    const found: User | null = await userModel.findOne({ email });

    return found;
}