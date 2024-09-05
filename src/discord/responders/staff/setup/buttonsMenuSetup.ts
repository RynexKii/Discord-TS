import { Responder, ResponderType } from "#base";
import { database } from "#database";
import { firstSetupMessage, setupNotPermissionContent } from "#messages/*";

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
