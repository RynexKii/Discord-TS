import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";

export function firstSetupMessage(guildName: string, guildId: string, guildIconUrl: string | null) {
    // Mensagem - Embed
    const embedFirstSetup = new EmbedBuilder()
        .setAuthor({ name: "Confirme o Servidor", iconURL: "https://cdn.discordapp.com/emojis/1281046694406131817.webp?size=32&quality=lossless" })
        .setThumbnail(guildIconUrl)
        .setDescription(
            `Bem-vindo(a) à primeira etapa de configuração. Por favor, confirme se deseja definir este servidor como o padrão.
            
            >>> **Nome do Servidor**: ${guildName}
            **ID do Servidor**: ${guildId}
            `
        )
        .setColor("White");

    // Componentes - Botões
    const rowButtonsFirstSetup = createRow(
        new ButtonBuilder({
            customId: "button/first/setup/confirm",
            label: "Confirmar",
            style: ButtonStyle.Success,
            emoji: "<:Confirm:1281046703176421477>",
        }),
        new ButtonBuilder({
            customId: "button/first/setup/cancel",
            label: "Cancelar",
            style: ButtonStyle.Danger,
            emoji: "<:Cancel:1281046710830895115>",
        })
    );

    return { embeds: [embedFirstSetup], components: [rowButtonsFirstSetup], ephemeral };
}