import { database } from "#database";
import { settings } from "#settings";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";

export async function menuSetupMessage(guildId: string) {
    // Importando - Banco de Dados
    const guildNameDatabase = await database.guild.get(guildId, "guildName");
    const guildIconUrlDatabase = await database.guild.get(guildId, "guildIconUrl");

    // Mensagem - Embed
    const embedMenuSetup = new EmbedBuilder()
        .setAuthor({ name: "Painel de Controle", iconURL: "https://cdn.discordapp.com/emojis/1280961865735995522.webp?size=32&quality=lossless" })
        .setDescription(
            `Seja bem-vindo(a) ao meu painel de controle! Aqui você pode acessar e gerenciar todas as minhas configurações, além de explorar alguns recursos extras.
            
            >>> **Canais** - Configure canais que não contaram para o sistema de Bloods.
            **Boost** - Ative um Boost de Bloods no servidor.
            **Logs** - Configure os canais de Logs.
            **Gerar Código** - Gere códigos para resgate.
            **Boas Vindas** - Configure uma mensagem de boas vindas para quem entrar no servidor.
            **Reset** - Reseta todas as configurações.`
        )
        .setFooter({ text: `Servidor Principal: ${guildNameDatabase ?? "Nenhum"}`, iconURL: guildIconUrlDatabase ?? undefined })
        .setColor("White");

    // Componentes - Botões
    const rowButtonsMenuSetup = createRow(
        new ButtonBuilder({
            customId: "button/menu/setup/home",
            label: "Início",
            style: ButtonStyle.Secondary,
            emoji: settings.emojis.static.home,
            disabled: true,
        }),
        new ButtonBuilder({
            customId: "button/menu/setup/channels",
            label: "Canais",
            style: ButtonStyle.Secondary,
            emoji: settings.emojis.static.channelsLogs,
        }),
        new ButtonBuilder({
            customId: "button/menu/setup/boost",
            label: "Boost",
            style: ButtonStyle.Secondary,
            emoji: settings.emojis.static.boost,
            disabled: true,
        }),
        new ButtonBuilder({
            customId: "button/menu/setup/logs",
            label: "Logs",
            style: ButtonStyle.Secondary,
            emoji: settings.emojis.static.logs,
            disabled: true,
        }),
        new ButtonBuilder({
            customId: "button/menu/setup/code",
            label: "Gerar Código",
            style: ButtonStyle.Secondary,
            emoji: settings.emojis.static.key,
            disabled: true,
        })
    );

    // Componentes - Botões 2
    const rowButtonsMenuSetup2 = createRow(
        new ButtonBuilder({
            customId: "button/menu/setup/welcome",
            label: "Boas Vindas",
            style: ButtonStyle.Secondary,
            emoji: settings.emojis.static.welcome,
        }),
        new ButtonBuilder({
            customId: "button/menu/setup/reset",
            label: "Reset",
            style: ButtonStyle.Danger,
            emoji: "<:Reset:1281018264549457972>",
        })
    );

    return { embeds: [embedMenuSetup], components: [rowButtonsMenuSetup, rowButtonsMenuSetup2], ephemeral };
}
