import dotenv from 'dotenv';

dotenv.config();

export const SERVER_PORT = process.env.API_PORT || 3000;