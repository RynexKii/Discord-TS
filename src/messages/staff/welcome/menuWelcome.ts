import { database } from "#database";
import { settings } from "#settings";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, channelMention, EmbedBuilder, inlineCode } from "discord.js";

export async function menuWelcomeMessage(guildId: string) {
    // Importando - Banco de Dados
    const guildNameDatabase = await database.guild.get(guildId, "guildName");
    const guildIconUrlDatabase = await database.guild.get(guildId, "guildIconUrl");

    const messageDatabase = await database.guild.get(guildId, "welcomeMessage");
    let channelDatabase = await database.guild.get(guildId, "welcomeChannel");
    let channelLogsDatabase = await database.guild.get(guildId, "welcomeChannelLogs");

    if (channelDatabase && channelDatabase) channelDatabase = channelMention(channelDatabase.toString());
    if (channelLogsDatabase) channelLogsDatabase = channelMention(channelLogsDatabase.toString());

    // Mensagem - Embed
    const embedMenuWelcome = new EmbedBuilder()
        .setAuthor({ name: "Painel de Controle - Boas Vindas", iconURL: "https://cdn.discordapp.com/emojis/1280961865735995522.webp?size=32&quality=lossless" })
        .setDescription(
            `Configure uma mensagem de boas vindas para quem entrar no servidor ou modifique a mensagem.

            Para mencionar o usuário, utilize ${inlineCode("userId")}
            
            **Mensagem Atual**
            
            \`\`\`${messageDatabase ?? "Sem mensagem definida"}\`\`\`

            **Canal Principal**: ${channelDatabase ?? inlineCode("Sem Canal")}
            **Canal de Logs**: ${channelLogsDatabase ?? inlineCode("Sem Canal")}
            `
        )
        .setFooter({ text: `Servidor Principal: ${guildNameDatabase ?? "Nenhum"}`, iconURL: guildIconUrlDatabase ?? undefined })
        .setColor("White");

    // Componentes - Botões
    const rowButtonsMenuWelcome = createRow(
        new ButtonBuilder({
            customId: "button/menu/setup/home",
            label: "Início",
            style: ButtonStyle.Secondary,
            emoji: settings.emojis.static.home,
        }),
        new ButtonBuilder({
            customId: "button/menu/welcome/message",
            label: "Mensagem",
            style: ButtonStyle.Secondary,
            emoji: settings.emojis.static.messages,
        }),
        new ButtonBuilder({
            customId: "button/menu/welcome/channel",
            label: "Canal",
            style: ButtonStyle.Secondary,
            emoji: settings.emojis.static.channels,
        }),
        new ButtonBuilder({
            customId: "button/menu/welcome/channel/logs",
            label: "Canal Logs",
            style: ButtonStyle.Secondary,
            emoji: settings.emojis.static.channelsLogs,
        })
    );

    return { embeds: [embedMenuWelcome], components: [rowButtonsMenuWelcome], ephemeral };
}
