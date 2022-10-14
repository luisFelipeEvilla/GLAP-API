import chalk from "chalk";
import mongoose from "mongoose";

import { DB_URI } from "../config";

const connect = async () => {
    try {
        await mongoose.connect(DB_URI);
    } catch (error) {
        chalk.red(`Database connection error \n ${error}`);
        process.exit(1)
    }
}


export default connect;