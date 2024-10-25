import { settings } from "#settings";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, ChannelSelectMenuBuilder, ChannelType, EmbedBuilder } from "discord.js";

export function addChannelMessage() {
    const embedAddChannel = new EmbedBuilder()
        .setAuthor({ name: "Painel de Controle - Canais Adicionar", iconURL: "https://cdn.discordapp.com/emojis/1280961865735995522.webp?size=32&quality=lossless" })
        .setDescription("Escolha o canal que deseja adicionar a lista no Banco de Dados")
        .setColor("Green");

    // Componentes - Select Channel
    const rowAddChannelSelect = createRow(
        new ChannelSelectMenuBuilder({
            customId: "select/menu/channel/add",
            placeholder: "Adicionar Canais ao Banco de Dados",
            channelTypes: [ChannelType.GuildText, ChannelType.GuildVoice],
        })
    );

    // Componentes - Botões
    const rowButtonHome = createRow(
        new ButtonBuilder({
            customId: "button/menu/setup/home",
            label: "Início",
            style: ButtonStyle.Secondary,
            emoji: settings.emojis.static.home,
        })
    );

    return { embeds: [embedAddChannel], components: [rowAddChannelSelect, rowButtonHome], ephemeral };
}
