import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";

export function menuSetupMessage(guildName: string, guildIconUrl: string | undefined) {
    // Mensagem - Embed
    const embedMenuSetup = new EmbedBuilder()
        .setAuthor({ name: "Painel de Controle", iconURL: "https://cdn.discordapp.com/emojis/1280961865735995522.webp?size=32&quality=lossless" })
        .setDescription(
            `Seja bem-vindo(a) ao meu painel de controle! Aqui você pode acessar e gerenciar todas as minhas configurações, além de explorar alguns recursos extras.
            
            >>> **Canais** - Configure canais que não contaram para o sistema de Bloods.
            **Boost** - Ative um Boost de Bloods no servidor.
            **Reset** - Reseta todas as configurações.`
        )
        .setFooter({ text: `Servidor Principal: ${guildName}`, iconURL: guildIconUrl })
        .setColor("White");

    // Componentes - Botões
    const rowButtonsMenuSetup = createRow(
        new ButtonBuilder({
            customId: "button/menu/setup/home",
            label: "Início",
            style: ButtonStyle.Secondary,
            emoji: "<:Home:1280961849390530590>",
            disabled: true,
        }),
        new ButtonBuilder({
            customId: "button/menu/setup/channels",
            label: "Canais",
            style: ButtonStyle.Secondary,
            emoji: "<:Channels:1280961857519222784>",
        }),
        new ButtonBuilder({
            customId: "button/menu/setup/boost",
            label: "Boost",
            style: ButtonStyle.Secondary,
            emoji: "<:Boost:1280961836094591028>",
            disabled: true,
        }),
        new ButtonBuilder({
            customId: "button/menu/setup/reset",
            label: "Reset",
            style: ButtonStyle.Danger,
            emoji: "<:Reset:1281018264549457972>",
        })
    );

    return { embeds: [embedMenuSetup], components: [rowButtonsMenuSetup], ephemeral };
}
