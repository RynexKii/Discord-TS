import { Responder, ResponderType } from "#base";
import { checkResetMessage, menuChannelMessage, menuSetupMessage, menuWelcomeMessage, setupNotPermissionContent } from "#messages";

// Botão de Início
new Responder({
    customId: "button/menu/setup/home",
    type: ResponderType.Button,
    cache: "cached",
    async run(interaction) {
        const guildId = interaction.guildId;

        await interaction.deferUpdate();

        return await interaction.editReply(await menuSetupMessage(guildId));
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

        await interaction.deferUpdate();

        return await interaction.editReply(await menuChannelMessage(guildId));
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

        await interaction.deferUpdate();

        return await interaction.editReply(await menuWelcomeMessage(guildId));
    },
});

// Botão de Reset
new Responder({
    customId: "button/menu/setup/reset",
    type: ResponderType.Button,
    cache: "cached",
    async run(interaction) {
        if (!interaction.member.permissions.has("Administrator")) return await interaction.reply(setupNotPermissionContent);

        return await interaction.update(checkResetMessage());
    },
});
