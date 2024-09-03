import { Schema } from "mongoose";

export const profileSchema = new Schema(
    {
        userId: { type: String, required: true },
        bloods: { type: Number, default: 0 },
        bloodsRank: { type: Schema.Types.Mixed, default: "Sem Rank" },
        fame: { type: Number, default: 0 },
        about: {
            type: String,
            default: function ({ userId }: { userId: string }) {
                return `Não conhecemos <@${userId}> muito bem, mas temos certeza que é gente boa.`;
            },
        },
    },
    {
        versionKey: false,
        statics: {
            // Set = Para setar um valor na chave no Banco de Dados
            async set(id: string, key: string, value: number | string) {
                let profile = await this.findOne({ userId: id });

                if (!profile) profile = await this.create({ userId: id });

                await profile.updateOne({ [key]: value });

                profile = await this.findOne({ userId: id });

                return profile?.get(key);
            },
            // Delete = Para deletar um perfil do Banco de Dados
            async delete(id: string) {
                await this.findOneAndDelete({ userId: id });
            },
            // Add = Para adicionar valor a chave no Banco de Dados
            async add(id: string, key: string, value: number) {
                let profile = await this.findOne({ userId: id });

                if (!profile) profile = await this.create({ userId: id });

                await profile.updateOne({ [key]: profile.get(key) + value });

                profile = await this.findOne({ userId: id });

                return profile?.get(key);
            },
            // Sub = Para subtrair valor da chave no Banco de Dados
            async sub(id: string, key: string, value: number) {
                let profile = await this.findOne({ userId: id });

                if (!profile) profile = await this.create({ userId: id });

                await profile.updateOne({ [key]: profile.get(key) - value });

                profile = await this.findOne({ userId: id });

                return profile?.get(key);
            },
        },
    }
);
