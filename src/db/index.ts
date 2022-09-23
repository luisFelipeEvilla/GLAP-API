import chalk from "chalk";
import mongoose from "mongoose";

import { DB_URI } from "../config";

const connect = () => {
    mongoose.connect(DB_URI,(err) => {
        if (err) {
            chalk.red(`Database connection error \n ${err}`);
            process.exit(1)
        }
    })
}

export default connect;