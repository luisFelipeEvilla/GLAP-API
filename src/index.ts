import express from "express";
import chalk from "chalk";

import { SERVER_PORT } from "./config";

const app = express();

app.listen(SERVER_PORT, () => {
    console.log(chalk.green(`Server listening on ${SERVER_PORT}`));
});