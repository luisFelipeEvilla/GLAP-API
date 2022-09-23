import dotenv from 'dotenv';

dotenv.config();

export const SERVER_PORT = process.env.API_PORT || 3000;

export const DB_URI = process.env.DB_URI || 'mongodb://localhost/my_database';