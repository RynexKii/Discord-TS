import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, ChannelSelectMenuBuilder, ChannelType, EmbedBuilder } from "discord.js";

export function channelLogsWelcomeMessage() {
    // Mensagem - Embed
    const embedChannelLogsWelcomeMessage = new EmbedBuilder()
        .setAuthor({
            name: "Painel de Controle - Boas Vindas Canal Logs",
            iconURL: "https://cdn.discordapp.com/emojis/1280961865735995522.webp?size=32&quality=lossless",
        })
        .setDescription("Escolha o canal de logs para o envio da mensagem de Boas Vindas.")
        .setColor("DarkGold");

    // Componentes - Select Channel
    const rowChannelWelcomeSelect = createRow(
        new ChannelSelectMenuBuilder({
            customId: "select/menu/welcome/channel/logs",
            placeholder: "Adicionar canal principal de Bem-Vindo(a)",
            channelTypes: [ChannelType.GuildText],
        })
    );

    // Componentes - Botões
    const rowButtonHome = createRow(
        new ButtonBuilder({
            customId: "button/menu/setup/home",
            label: "Início",
            style: ButtonStyle.Secondary,
            emoji: "<:Home:1280961849390530590>",
        }),
        new ButtonBuilder({
            customId: "button/menu/welcome/channel/logs/remove",
            label: "Remover",
            style: ButtonStyle.Danger,
            emoji: "<:Remove:1281098964074106940>",
        })
    );
    return { embeds: [embedChannelLogsWelcomeMessage], components: [rowChannelWelcomeSelect, rowButtonHome] };
}
