import { genSaltSync, hashSync } from 'bcrypt';

import connect from "../db";
import { ResourceAlreadyExistsError } from "../Errors/errors";
import userModel, { User } from "../models/userModel";


export const addUser = async (user: User) => {
    try {
        await connect();
        
        const found = await getUser(user.email);

        if (found) throw new ResourceAlreadyExistsError(`Error, user ${user.email} already exists`);
        
        // password encryption
        const salt = genSaltSync(10);
        user.password = hashSync(user.password, salt);

        const result = await userModel.create(user);

        return result;
    } catch (error) {
        throw error;
    }
}


export const getUser = async (email: String): Promise<User | null> => {
    await connect();
    
    const found: User | null = await userModel.findOne({ email });

    return found;
}