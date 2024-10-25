import { PrismaClient } from "@prisma/client";

interface CreateUserData {
    userId: string;
}

export class UserController {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(data: CreateUserData) {
        try {
            const user = await this.prisma.users.findUnique({ where: { userId: data.userId } });

            if (!user) {
                return this.prisma.users.create({
                    data: {
                        userId: data.userId,
                        aboutMe: `Não conhecemos <@${data.userId}> muito bem, mas temos certeza que é gente boa.`,
                    },
                });
            }

            return user;
        } catch (error) {
            return error;
        }
    }
}
