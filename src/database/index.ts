import { PrismaClient } from "@prisma/client";
import { log } from "#settings";
import chalk from "chalk";
import { GuildController } from "./Controllers/GuildController.js";
import { UserController } from "./Controllers/UserController.js";

const prisma = new PrismaClient();

// Conectando o Prisma
prisma
    .$connect()
    .then(() => {
        log.success(chalk.cyan("Prisma Supabase connected"));
    })
    .catch((error) => {
        log.error(error);
        process.exit(1);
    });

// Exportando seus Controllers
export const database = {
    guild: new GuildController(),
    user: new UserController(),
};
