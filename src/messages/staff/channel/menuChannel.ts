import { database } from "#database";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, EmbedBuilder, inlineCode } from "discord.js";

// Função que pega os Canais de Texto do Banco de Dados
async function textChannels(guildId: string) {
    const textChannelsDatabase: [] = await database.guild.get(guildId, "bloodsChannelText");
    let textChannels: string | undefined;

    if (textChannelsDatabase.length > 0) {
        textChannels = "";
        textChannelsDatabase.forEach((channelId) => {
            textChannels += `<#${channelId}> `;
        });
    }

    return textChannels;
}

// Função que pega os Canais de Voz do Banco de Dados
async function voiceChannels(guildId: string) {
    const voiceChannelsDatabase: [] = await database.guild.get(guildId, "bloodsChannelVoice");
    let voiceChannels: string | undefined = undefined;

    if (voiceChannelsDatabase.length > 0) {
        voiceChannels = "";
        voiceChannelsDatabase.forEach((channelId) => {
            voiceChannels += `<#${channelId}> `;
        });
    }

    return voiceChannels;
}

export async function menuChannelMessage(guildId: string) {
    // Importando - Banco de Dados
    const guildNameDatabase = await database.guild.get(guildId, "guildName");
    const guildIconUrlDatabase = await database.guild.get(guildId, "guildIconUrl");

    // Mensagem - Embed
    const embedMenuChannel = new EmbedBuilder()
        .setAuthor({ name: "Painel de Controle - Canais", iconURL: "https://cdn.discordapp.com/emojis/1280961865735995522.webp?size=32&quality=lossless" })
        .setDescription(
            `Configure os canais de texto ou voz que não serão contabilizados pelo sistema de Bloods.
            
            * **Canais de Texto**: ${(await textChannels(guildId)) ?? inlineCode("Sem Canal")}
            * **Canais de Voz**: ${(await voiceChannels(guildId)) ?? inlineCode("Sem Canal")}
            `
        )
        .setFooter({ text: `Servidor Principal: ${guildNameDatabase}`, iconURL: guildIconUrlDatabase })
        .setColor("White");

    // Componentes - Botões
    const rowButtonsMenuChannel = createRow(
        new ButtonBuilder({
            customId: "button/menu/setup/home",
            label: "Início",
            style: ButtonStyle.Secondary,
            emoji: "<:Home:1280961849390530590>",
        }),
        new ButtonBuilder({
            customId: "button/menu/channel/add",
            label: "Adicionar",
            style: ButtonStyle.Success,
            emoji: "<:Add:1281098367308533780>",
        }),
        new ButtonBuilder({
            customId: "button/menu/channel/remove",
            label: "Remover",
            style: ButtonStyle.Danger,
            emoji: "<:Remove:1281098964074106940>",
        })
    );

    return { embeds: [embedMenuChannel], components: [rowButtonsMenuChannel], ephemeral };
}
