import { Event } from "#base";
import { database } from "#database";
import { messageWelcome } from "#messages/*";
import { ChannelType } from "discord.js";

new Event({
    name: "Envia uma mensagem de Bem-Vindo(a)",
    event: "guildMemberAdd",
    async run(client) {
        const guildId = client.guild.id;
        const userId = client.user.id;

        const channelDatabase = await database.guild.get(guildId, "welcomeChannel");
        const channelLogsDatabase = await database.guild.get(guildId, "welcomeChannelLogs");

        const channel = client.guild.channels.cache.get(channelDatabase);
        const channelLogs = client.guild.channels.cache.get(channelLogsDatabase);

        const messageWelcomeSend = await messageWelcome(userId, guildId);

        if (messageWelcomeSend && channel && channel.type === ChannelType.GuildText) {
            const message = await channel.send(messageWelcomeSend);

            // Deleta a mensagem depois de 2 minutos
            setTimeout(() => {
                message.delete();
            }, 120000);
        }

        if (messageWelcomeSend && channelLogs && channelLogs.type === ChannelType.GuildText) {
            channelLogs.send(messageWelcomeSend);
        }
    },
});
