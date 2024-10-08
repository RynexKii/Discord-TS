import { Schema } from "mongoose";

export const guildSchema = new Schema(
    {
        guildId: { type: String, required: true },
        guildName: { type: String },
        guildIconUrl: { type: String },
        bloodsChannelAll: { type: Array },
        bloodsChannelText: { type: Array },
        bloodsChannelVoice: { type: Array },
        welcomeMessage: { type: String },
        welcomeChannel: { type: String },
        welcomeChannelLogs: { type: String },
    },
    {
        versionKey: false,
        statics: {
            // Set = Para setar um valor na chave no Banco de Dados
            async set(guildId: string, key: string, value: number | string) {
                let guild = await this.findOne({ guildId: guildId });

                if (!guild) guild = await this.create({ guildId: guildId });

                await guild.updateOne({ [key]: value });

                guild = await this.findOne({ guildId: guildId });

                return guild?.get(key);
            },
            // Delete = Para deletar um perfil do Banco de Dados
            async delete(guildId: string) {
                await this.findOneAndDelete({ guildId: guildId });
            },
            // DeleteKey = Para deletar uma chave específica do Banco de Dados
            async deleteKey(guildId: string, key: string) {
                const guild = await this.findOne({ guildId: guildId });

                return guild?.updateOne({ $unset: { [key]: key } });
            },
            // Get = Para retornar alguma chave do Banco de Dados
            async get(guildId: string, key: string) {
                const guild = await this.findOne({ guildId: guildId });

                return guild?.get(key);
            },
            // Add = Para adicionar valor a chave no Banco de Dados
            async add(guildId: string, key: string, value: number) {
                let guild = await this.findOne({ guildId: guildId });

                if (!guild) guild = await this.create({ guildId: guildId });

                await guild.updateOne({ [key]: guild.get(key) + value });

                guild = await this.findOne({ guildId: guildId });

                return guild?.get(key);
            },
            // Sub = Para subtrair valor da chave no Banco de Dados
            async sub(guildId: string, key: string, value: number) {
                let guild = await this.findOne({ guildId: guildId });

                if (!guild) guild = await this.create({ guildId: guildId });

                await guild.updateOne({ [key]: guild.get(key) - value });

                guild = await this.findOne({ guildId: guildId });

                return guild?.get(key);
            },
            // Push - Adiciona a uma chave de Array um valor
            async push(guildId: string, key: string, value: number | string) {
                let guild = await this.findOne({ guildId: guildId });

                if (!guild) guild = await this.create({ guildId: guildId });

                await guild.updateOne({ $push: { [key]: value } });

                guild = await this.findOne({ guildId: guildId });

                return guild?.get(key);
            },
            // Pull - Remove de uma chave de Array um valor
            async pull(guildId: string, key: string, value: number | string) {
                let guild = await this.findOne({ guildId: guildId });

                if (!guild) guild = await this.create({ guildId: guildId });

                await guild.updateOne({ $pull: { [key]: value } });

                guild = await this.findOne({ guildId: guildId });

                return guild?.get(key);
            },
        },
    }
);
