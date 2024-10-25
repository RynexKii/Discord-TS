import { Responder, ResponderType } from "#base";
import { database } from "#database";
import { firstSetupMessage, menuSetupMessage, setupNotPermissionContent } from "#messages";

// Botão de Confirmar
new Responder({
    customId: "button/menu/setup/reset/confirm",
    type: ResponderType.Button,
    cache: "cached",
    async run(interaction) {
        const guildId = interaction.guildId;
        const guildName = interaction.guild.name;
        const guildIconUrl = interaction.guild.iconURL();

        if (!interaction.member.permissions.has("Administrator")) return await interaction.reply(setupNotPermissionContent);

        await interaction.deferUpdate();

        await database.guild.delete(guildId);

        return await interaction.editReply(firstSetupMessage(guildName, guildId, guildIconUrl));
    },
});

// Botão de Cancelar
new Responder({
    customId: "button/menu/setup/reset/cancel",
    type: ResponderType.Button,
    cache: "cached",
    async run(interaction) {
        const guildId = interaction.guildId;

        return await interaction.update(await menuSetupMessage(guildId));
    },
});
