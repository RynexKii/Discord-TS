import { Responder, ResponderType } from "#base";
import { database } from "#database";
import { channelLogsWelcomeMessage, channelWelcomeMessage, menuWelcomeMessage } from "#messages";
import { createModalInput } from "@magicyan/discord";
import { ModalBuilder, TextInputStyle } from "discord.js";

// Botão da Mensagem de Bem Vindo(a)
new Responder({
    customId: "button/menu/welcome/message",
    type: ResponderType.Button,
    cache: "cached",
    async run(interaction) {
        const guildId = interaction.guildId;
        const guildName = interaction.guild.name;

        const welcomeMessageDatabase = await database.guild.get(guildId, "welcomeMessage");

        const welcomeMessage = Array.isArray(welcomeMessageDatabase) ? undefined : welcomeMessageDatabase?.toString();

        const modalMenuWelcomeMessage = new ModalBuilder({
            customId: "modal/menu/welcome/message",
            title: guildName,
            components: [
                createModalInput({
                    customId: "welcomeMessage",
                    label: "Mensagem de Bem-Vindo(a)",
                    placeholder: "Digite aqui...",
                    style: TextInputStyle.Paragraph,
                    minLength: 5,
                    maxLength: 1024,
                    value: welcomeMessage,
                }),
            ],
        });

        return await interaction.showModal(modalMenuWelcomeMessage);
    },
});

// Botão do Canal
new Responder({
    customId: "button/menu/welcome/channel",
    type: ResponderType.Button,
    cache: "cached",
    async run(interaction) {
        await interaction.update(channelWelcomeMessage());
    },
});

// Botão do Canal Remover
new Responder({
    customId: "button/menu/welcome/channel/remove",
    type: ResponderType.Button,
    cache: "cached",
    async run(interaction) {
        const guildId = interaction.guildId;

        await interaction.deferUpdate();

        await database.guild.deleteKey(guildId, "welcomeChannel");

        await interaction.editReply(await menuWelcomeMessage(guildId));
    },
});

// Botão do Canal de Logs
new Responder({
    customId: "button/menu/welcome/channel/logs",
    type: ResponderType.Button,
    cache: "cached",
    async run(interaction) {
        await interaction.update(channelLogsWelcomeMessage());
    },
});

// Botão do Canal de Logs Remover
new Responder({
    customId: "button/menu/welcome/channel/logs/remove",
    type: ResponderType.Button,
    cache: "cached",
    async run(interaction) {
        const guildId = interaction.guildId;

        await interaction.deferUpdate();

        await database.guild.deleteKey(guildId, "welcomeChannelLogs");

        await interaction.editReply(await menuWelcomeMessage(guildId));
    },
});
