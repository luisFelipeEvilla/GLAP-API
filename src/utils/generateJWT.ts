import jwt from 'jsonwebtoken';
import {jwtSecret} from '../config';
import { User } from '../models/userModel.js';

export const generateToken = (user: User) => {
    const token = jwt.sign(
        { _id: user._id, email: user.email },
        jwtSecret,
        {
            expiresIn: '3d'
        }
    )

    return token;
}

export default generateToken;