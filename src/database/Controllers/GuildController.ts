import { Guilds, PrismaClient } from "@prisma/client";
import { GuildSetData } from "database/Interfaces/Guild.js";

export class GuildController {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }

    // Create = Para criar uma Guild caso não tenha sido criada
    async create(guildId: string, guildName?: string, guildIconUrl?: string) {
        const guild = await this.prisma.guilds.findUnique({ where: { guildId: guildId } });

        if (!guild) {
            return this.prisma.guilds.create({
                data: {
                    guildId: guildId,
                    guildName: guildName,
                    guildIconUrl: guildIconUrl,
                },
            });
        }

        return guild;
    }

    // Get = Para retornar alguma chave do Banco de Dados
    async get<K extends keyof Guilds>(guildId: string, key: K): Promise<Guilds[K] | undefined> {
        const guild = await this.prisma.guilds.findUnique({ where: { guildId: guildId } });

        if (!guild) return undefined;

        return guild[key];
    }

    // Set = Para setar um valor na chave no Banco de Dados
    async set(guildId: string, key: keyof GuildSetData, value: number | string) {
        const guild = await this.prisma.guilds.findUnique({ where: { guildId: guildId } });

        if (!guild) await this.create(guildId);

        await this.prisma.guilds.update({ where: { guildId: guildId }, data: { [key]: value } });
    }

    // Delete = Para deletar uma Guild do Banco de Dados
    async delete(guildId: string) {
        const guild = await this.prisma.guilds.findUnique({ where: { guildId: guildId } });

        if (guild) await this.prisma.guilds.delete({ where: { guildId: guildId } });
    }

    // DeleteKey = Para deletar uma chave específica do Banco de Dados
    async deleteKey(guildId: string, key: string) {
        const guild = await this.prisma.guilds.findUnique({ where: { guildId: guildId } });

        if (guild) await this.prisma.guilds.update({ where: { guildId: guildId }, data: { [key]: null } });
    }

    // Push - Adiciona a uma chave de Array um valor
    async push(guildId: string, key: keyof Guilds, value: string) {
        const guild = await this.prisma.guilds.findUnique({ where: { guildId: guildId } });

        if (!guild) await this.create(guildId);

        await this.prisma.guilds.update({ where: { guildId: guildId }, data: { [key]: { push: [value] } } });
    }

    // Pull - Remove de uma chave de Array um valor
    async pull(guildId: string, key: keyof Guilds, value: string) {
        const guild = await this.prisma.guilds.findUnique({ where: { guildId: guildId } });

        if (!guild) await this.create(guildId);

        if (guild && guild[key] && Array.isArray(guild[key])) {
            const newArray: string[] = guild[key].filter((test) => test !== value);

            await this.prisma.guilds.update({ where: { guildId: guildId }, data: { [key]: { set: newArray } } });
        }
    }
}
