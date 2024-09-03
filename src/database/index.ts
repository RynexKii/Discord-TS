import mongoose, { model } from "mongoose";
import { log } from "#settings";
import chalk from "chalk";
import { profileSchema } from "./schemas/profile.js";

// Conectando no MongoDB
try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "database" });
    log.success(chalk.green("MongoDB connected"));
} catch (err) {
    log.error(err);
    process.exit(1);
}

// Criando o model e exportando
export const database = {
    profile: model("Profile", profileSchema, "Profile"),
};
