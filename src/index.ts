import express from "express";
import chalk from "chalk";

import signup from './routes/auth';
import reports from './routes/report';

import { SERVER_PORT } from "./config";
import { errorHandler } from "./middlewares/errorHandler";
import verifyToken from "./middlewares/auth";

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(errorHandler);

app.use('/auth', signup);
app.use('/reports', verifyToken ,reports);

app.listen(SERVER_PORT, () => {
    console.log(chalk.green(`Server listening on ${SERVER_PORT}`));
});