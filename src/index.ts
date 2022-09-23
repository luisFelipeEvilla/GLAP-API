import express from "express";
import chalk from "chalk";

import signup from './routes/signup';

import { SERVER_PORT } from "./config";

const app = express();

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/signup', signup);

app.listen(SERVER_PORT, () => {
    console.log(chalk.green(`Server listening on ${SERVER_PORT}`));
});