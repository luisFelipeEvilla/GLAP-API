import express from "express";
import chalk from "chalk";

import signup from './routes/signup';

import connect from "./db";
import { SERVER_PORT } from "./config";

const app = express();

connect();

app.use('/signup', signup);

app.listen(SERVER_PORT, () => {
    console.log(chalk.green(`Server listening on ${SERVER_PORT}`));
});