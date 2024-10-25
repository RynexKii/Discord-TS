import { Event } from "#base";
import { database } from "#database";
import { messageWelcome } from "#messages";
import { ChannelType } from "discord.js";

new Event({
    name: "Envia uma mensagem de Bem-Vindo(a)",
    event: "guildMemberAdd",
    async run(client) {
        const guildId = client.guild.id;
        const userId = client.user.id;

        const channelDatabase = (await database.guild.get(guildId, "welcomeChannel")) ?? "";
        const channelLogsDatabase = (await database.guild.get(guildId, "welcomeChannelLogs")) ?? "";

        const channel = client.guild.channels.cache.get(channelDatabase.toString());
        const channelLogs = client.guild.channels.cache.get(channelLogsDatabase.toString());

        const messageWelcomeSend = await messageWelcome(userId, guildId);

        // Verifica se a mensagem de Bem vindo existe e depois verifica se o canal existe e se é um canal de texto
        if (messageWelcomeSend && channel && channel.type === ChannelType.GuildText) {
            const message = await channel.send(messageWelcomeSend);

            // Deleta a mensagem depois de 2 minutos
            setTimeout(() => {
                message.delete();
            }, 120000);
        }

        // Envia uma mensagem no canal de Logs para a staff
        if (messageWelcomeSend && channelLogs && channelLogs.type === ChannelType.GuildText) {
            channelLogs.send(messageWelcomeSend);
        }
    },
});
