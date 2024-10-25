import { PrismaClient } from "@prisma/client";
import { UserAddData } from "database/Interfaces/User.js";

export class UserController {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }

    // Create = Para registrar um usuário caso não tenha sido registrado
    async create(userId: string) {
        const user = await this.prisma.users.findUnique({ where: { userId: userId } });

        if (!user) {
            return this.prisma.users.create({
                data: {
                    userId: userId,
                    aboutMe: `Não conhecemos <@${userId}> muito bem, mas temos certeza que é gente boa.`,
                },
            });
        }

        return user;
    }

    // Add = Para adicionar valor a chave no Banco de Dados
    async add(userId: string, key: keyof UserAddData, value: number) {
        let user = await this.prisma.users.findUnique({ where: { userId: userId } });

        if (!user) {
            await this.create(userId);
            await this.prisma.users.update({ where: { userId: userId }, data: { [key]: value } });
            return value;
        }

        await this.prisma.users.update({ where: { userId: userId }, data: { [key]: user[key] + value } });
        return user[key] + value;
    }

    // Sub = Para subtrair valor da chave no Banco de Dados
    async sub(userId: string, key: keyof UserAddData, value: number) {
        let user = await this.prisma.users.findUnique({ where: { userId: userId } });

        if (!user) {
            await this.create(userId);
            return 0 - value;
        }

        await this.prisma.users.update({ where: { userId: userId }, data: { [key]: user[key] - value } });
        return user[key] - value;
    }
}
