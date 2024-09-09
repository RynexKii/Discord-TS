import { Responder, ResponderType } from "#base";
import { database } from "#database";
import { firstSetupMessage, menuChannelMessage, menuSetupMessage, menuWelcomeMessage, setupNotPermissionContent } from "#messages/*";

// Botão de Início
new Responder({
    customId: "button/menu/setup/home",
    type: ResponderType.Button,
    cache: "cached",
    async run(interaction) {
        const guildId = interaction.guildId;

        return await interaction.update(await menuSetupMessage(guildId));
    },
});

// Botão de Canais
new Responder({
    customId: "button/menu/setup/channels",
    type: ResponderType.Button,
    cache: "cached",
    async run(interaction) {
        const guildId = interaction.guildId;

        if (!interaction.member.permissions.has("Administrator")) return await interaction.reply(setupNotPermissionContent);

        return await interaction.update(await menuChannelMessage(guildId));
    },
});

// Botão de Bem Vindo(a)
new Responder({
    customId: "button/menu/setup/welcome",
    type: ResponderType.Button,
    cache: "cached",
    async run(interaction) {
        const guildId = interaction.guildId;

        if (!interaction.member.permissions.has("Administrator")) return await interaction.reply(setupNotPermissionContent);

        return await interaction.update(await menuWelcomeMessage(guildId));
    },
});

// Botão de Reset
new Responder({
    customId: "button/menu/setup/reset",
    type: ResponderType.Button,
    cache: "cached",
    async run(interaction) {
        const guildId = interaction.guildId;
        const guildName = interaction.guild.name;
        const guildIconUrl = interaction.guild.iconURL();

        if (!interaction.member.permissions.has("Administrator")) return await interaction.reply(setupNotPermissionContent);

        await database.guild.delete(guildId);

        return await interaction.update(firstSetupMessage(guildName, guildId, guildIconUrl));
    },
});
