import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, ChannelSelectMenuBuilder, ChannelType, EmbedBuilder } from "discord.js";

export function removeChannelMessage() {
    const embedRemoveChannel = new EmbedBuilder()
        .setAuthor({ name: "Painel de Controle - Canais Remover", iconURL: "https://cdn.discordapp.com/emojis/1280961865735995522.webp?size=32&quality=lossless" })
        .setDescription("Escolha o canal que deseja remover da lista do Banco de Dados")
        .setColor("Red");

    // Componentes - Select Channel
    const rowRemoveChannelSelect = createRow(
        new ChannelSelectMenuBuilder({
            customId: "select/menu/channel/remove",
            placeholder: "Adicionar Canais ao Banco de Dados",
            channelTypes: [ChannelType.GuildText, ChannelType.GuildVoice],
        })
    );

    const rowButtonHome = createRow(
        new ButtonBuilder({
            customId: "button/menu/setup/home",
            label: "Início",
            style: ButtonStyle.Secondary,
            emoji: "<:home:1224341744531804210>",
        })
    );

    return { embeds: [embedRemoveChannel], components: [rowRemoveChannelSelect, rowButtonHome], ephemeral };
}
