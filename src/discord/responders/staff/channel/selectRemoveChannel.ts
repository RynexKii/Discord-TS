import { Responder, ResponderType } from "#base";
import { database } from "#database";
import { menuChannelMessage, removeChannelNotContent } from "#messages/*";

new Responder({
    customId: "select/menu/channel/remove",
    type: ResponderType.ChannelSelect,
    cache: "cached",
    async run(interaction) {
        const guildId = interaction.guildId;

        const guildNameDatabase = await database.guild.get(guildId, "guildName");
        const guildIconUrlDatabase = await database.guild.get(guildId, "guildIconUrl");

        const selectChannelId = interaction.values[0];
        const selectChannelType = interaction.channels.get(selectChannelId)?.type;

        const allChannelDatabase: string[] = await database.guild.get(guildId, "bloodsChannelAll");

        if (!allChannelDatabase.includes(selectChannelId)) return await interaction.reply(removeChannelNotContent(selectChannelId));

        switch (selectChannelType) {
            // Tipo 0 = Canal de Texto
            case 0:
                await database.guild.pull(guildId, "bloodsChannelText", selectChannelId);
                await database.guild.pull(guildId, "bloodsChannelAll", selectChannelId);
                break;
            // Tipo 1 = Canal de Voz
            case 2:
                await database.guild.pull(guildId, "bloodsChannelVoice", selectChannelId);
                await database.guild.pull(guildId, "bloodsChannelAll", selectChannelId);
                break;
        }

        return await interaction.update(await menuChannelMessage(guildId, guildNameDatabase, guildIconUrlDatabase));
    },
});
