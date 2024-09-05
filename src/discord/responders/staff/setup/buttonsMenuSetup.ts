import { Responder, ResponderType } from "#base";
import { database } from "#database";
import { firstSetupMessage, menuChannelMessage, menuSetupMessage, setupNotPermissionContent } from "#messages/*";

// Botão de Início
new Responder({
    customId: "button/menu/setup/home",
    type: ResponderType.Button,
    cache: "cached",
    async run(interaction) {
        const guildId = interaction.guildId;
        const guildNameDatabase = await database.guild.get(guildId, "guildName");
        const guildIconUrlDatabase = await database.guild.get(guildId, "guildIconUrl");

        return await interaction.update(menuSetupMessage(guildNameDatabase, guildIconUrlDatabase));
    },
});

// Botão de Canais
new Responder({
    customId: "button/menu/setup/channels",
    type: ResponderType.Button,
    cache: "cached",
    async run(interaction) {
        const guildId = interaction.guildId;

        const guildNameDatabase = await database.guild.get(guildId, "guildName");
        const guildIconUrlDatabase = await database.guild.get(guildId, "guildIconUrl");

        if (!interaction.member.permissions.has("Administrator")) return await interaction.reply(setupNotPermissionContent);

        return await interaction.update(await menuChannelMessage(guildId, guildNameDatabase, guildIconUrlDatabase));
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
