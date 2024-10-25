import { Command } from "#base";
import { database } from "#database";
import { firstSetupMessage, menuSetupMessage } from "#messages";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";

new Command({
    name: "staff",
    description: "❰ Staff ❱ Comandos para a administração!",
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: "ManageChannels",
    options: [
        {
            name: "painel",
            description: "❰ Staff ❱ Painel de controle.",
            type: ApplicationCommandOptionType.Subcommand,
        },
    ],
    async run(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const guildId = interaction.guildId;
        const guildName = interaction.guild.name;
        const guildIconUrl = interaction.guild.iconURL();

        const guildIdDatabase = await database.guild.get(guildId, "guildId");

        if (!guildIdDatabase) return await interaction.editReply(firstSetupMessage(guildName, guildId, guildIconUrl));

        return await interaction.editReply(await menuSetupMessage(guildId));
    },
});
