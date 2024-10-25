import { Responder, ResponderType } from "#base";
import { database } from "#database";
import { menuWelcomeMessage } from "#messages";

// Menu de seleção de Adicionar o Canal Principal
new Responder({
    customId: "select/menu/welcome/channel",
    type: ResponderType.ChannelSelect,
    cache: "cached",
    async run(interaction) {
        const guildId = interaction.guildId;
        const channelId = interaction.values[0];

        await interaction.deferUpdate();

        await database.guild.set(guildId, "welcomeChannel", channelId);

        await interaction.editReply(await menuWelcomeMessage(guildId));
    },
});

// Menu de seleção de Adicionar o Canal de Logs
new Responder({
    customId: "select/menu/welcome/channel/logs",
    type: ResponderType.ChannelSelect,
    cache: "cached",
    async run(interaction) {
        const guildId = interaction.guildId;
        const channelId = interaction.values[0];

        await interaction.deferUpdate();

        await database.guild.set(guildId, "welcomeChannelLogs", channelId);

        await interaction.editReply(await menuWelcomeMessage(guildId));
    },
});
