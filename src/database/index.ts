import mongoose, { model } from "mongoose";
import { log } from "#settings";
import chalk from "chalk";
import { profileSchema } from "./schemas/profile.js";
import { guildSchema } from "./schemas/guild.js";

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
    guild: model("Guild", guildSchema, "Guild"),
    profile: model("Profile", profileSchema, "Profile"),
};
