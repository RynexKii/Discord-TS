import { Event } from "#base";
import { bloodsConfig } from "#config";
import { database } from "#database";
import { randomNumber } from "@magicyan/discord";

new Event({
    name: "❰ Bloods ❱ Adiciona Bloods para cada mensagem enviada no Servidor",
    event: "messageCreate",
    async run(message) {
        const {
            guildId,
            channelId,
            author: { id: userId },
        } = message;

        // Verificação para mensagens enviadas em DM
        if (!guildId || message.channel.isDMBased()) return;

        const guildIdDatabase = await database.guild.get(guildId, "guildId");

        // Verifica se existe um guildId no Banco de Dados
        if (!guildIdDatabase) return;

        const allChannelsDB = await database.guild.get(guildIdDatabase, "bloodsChannelAll");

        // Verificação dos canais que não concederão Bloods
        if (allChannelsDB && allChannelsDB.includes(channelId)) return;

        // Verifica se a mensagem foi enviada por um bot
        if (message.author.bot) return;

        const bloodsValue = randomNumber(bloodsConfig.bloodsForMessage.value1, bloodsConfig.bloodsForMessage.value2);

        // Adicionando os Bloods por mensagem enviada
        await database.user.add(userId, "bloods", bloodsValue);

        // Adicionando os Bloods para o Rank Mensal
        await database.user.add(userId, "bloodsMonthlyRank", bloodsValue);
    },
});
