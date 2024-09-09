import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, ChannelSelectMenuBuilder, ChannelType, EmbedBuilder } from "discord.js";

export function channelWelcomeMessage() {
    // Mensagem - Embed
    const embedChannelWelcomeMessage = new EmbedBuilder()
        .setAuthor({ name: "Painel de Controle - Boas Vindas Canal", iconURL: "https://cdn.discordapp.com/emojis/1280961865735995522.webp?size=32&quality=lossless" })
        .setDescription("Escolha o canal principal para o envio da mensagem de Boas Vindas.")
        .setColor("Green");

    // Componentes - Select Channel
    const rowChannelWelcomeSelect = createRow(
        new ChannelSelectMenuBuilder({
            customId: "select/menu/welcome/channel",
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
            customId: "button/menu/welcome/channel/remove",
            label: "Remover",
            style: ButtonStyle.Danger,
            emoji: "<:Remove:1281098964074106940>",
        })
    );
    return { embeds: [embedChannelWelcomeMessage], components: [rowChannelWelcomeSelect, rowButtonHome] };
}
