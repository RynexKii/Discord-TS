import { Responder, ResponderType } from "#base";
import { database } from "#database";
import { menuSetupMessage, setupNotPermissionContent } from "#messages/*";

// Botão de Confirmar
new Responder({
    customId: "button/first/setup/confirm",
    type: ResponderType.Button,
    cache: "cached",
    async run(interaction) {
        const guildId = interaction.guildId;
        const guildName = interaction.guild.name;
        const guildIconUrl = interaction.guild.iconURL();

        if (!interaction.member.permissions.has("Administrator")) return await interaction.reply(setupNotPermissionContent);

        await database.guild.set(guildId, "guildId", guildId);
        await database.guild.set(guildId, "guildName", guildName);

        if (guildIconUrl) await database.guild.set(guildId, "guildIconUrl", guildIconUrl);

        return await interaction.update(await menuSetupMessage(guildId));
    },
});

// Botão de Cancelar
new Responder({
    customId: "button/first/setup/cancel",
    type: ResponderType.Button,
    cache: "cached",
    async run(interaction) {
        await interaction.deferUpdate();
        await interaction.deleteReply();
    },
});
