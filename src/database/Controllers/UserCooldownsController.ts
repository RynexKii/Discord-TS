import { PrismaClient } from "@prisma/client";
import { UserCooldownCreateData } from "database/Interfaces/UserCooldowns.js";

export class UserCooldownsController {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }

    // Set = Para setar um cooldown em alguma chave no Banco de Dados
    async set(userId: string, key: keyof UserCooldownCreateData, cooldown: Date) {
        await this.prisma.users.upsert({
            where: { userId },
            create: {
                userId,
                aboutMe: `Não conhecemos <@${userId}> muito bem, mas temos certeza que é gente boa.`,
                cooldowns: { create: { [key]: cooldown } },
            },
            update: { cooldowns: { upsert: { where: { userId }, create: { [key]: cooldown }, update: { [key]: cooldown } } } },
        });

        return await this.prisma.users.findUnique({ where: { userId: userId } });
    }

    // Get = Para obter um cooldown de uma chave no Banco de Dados
    async get(userId: string, key: keyof UserCooldownCreateData) {
        const cooldown = await this.prisma.userCooldowns.findUnique({ where: { userId }, select: { [key]: true } });

        if (!cooldown) return;

        return cooldown[key];
    }
}
