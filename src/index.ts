import express from "express";
import chalk from "chalk";
import swaggerUi from 'swagger-ui-express';

import signup from './routes/auth';
import reports from './routes/reports/report';

import { SERVER_BASE_URL, PORT } from "./config";
import { errorHandler } from "./middlewares/errorHandler";
import verifyToken from "./middlewares/auth";

const swaggerFile = require('../public/swagger-output.json');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(cors({
    origin: '*'
}))
app.use(helmet());
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(errorHandler);

app.use('/auth', signup);
app.use('/reports', verifyToken ,reports);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, () => {
    console.log(chalk.green(`Server listening on ${SERVER_BASE_URL}:${PORT}`));
});