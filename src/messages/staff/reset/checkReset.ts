import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";

export function checkResetMessage() {
    const embed = new EmbedBuilder()
        .setAuthor({ name: "Painel de Controle - Reset", iconURL: "https://cdn.discordapp.com/emojis/1280961865735995522.webp?size=32&quality=lossless" })
        .setDescription("Isso vai apagar todas as minhas configurações. Você realmente deseja prosseguir?")
        .setColor("Red");
    const rowButtonsResetCheck = createRow(
        new ButtonBuilder({
            customId: "button/menu/setup/reset/confirm",
            label: "Confirmar",
            style: ButtonStyle.Success,
            emoji: "<:Confirm:1281046703176421477>",
        }),
        new ButtonBuilder({
            customId: "button/menu/setup/reset/cancel",
            label: "Cancelar",
            style: ButtonStyle.Danger,
            emoji: "<:Cancel:1281046710830895115>",
        })
    );

    return { embeds: [embed], components: [rowButtonsResetCheck], ephemeral };
}
