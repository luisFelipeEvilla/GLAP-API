import dotenv from 'dotenv';

dotenv.config();

export const SERVER_PORT = process.env.SERVER_PORT || 3000;
export const SERVER_BASE_URL = process.env.SERVER_BASE_URL || 'http://localhost';

export const DB_URI = process.env.DB_URI || 'mongodb://localhost/my_database';
export const jwtSecret = process.env.jwt_secret || 'secret';

export const DEFAULT_OFFSET = process.env.DEFAULT_OFFSET || 5;
