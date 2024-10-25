import { Event } from "#base";
import { bloodsConfig } from "#config";
import { database } from "#database";
import { randomNumber } from "@magicyan/discord";
import { ChannelType } from "discord.js";

new Event({
    name: "❰ Bloods ❱ Adiciona Bloods a cada tempo ao usuário em chamada de Voz",
    event: "ready",
    async run(client) {
        async function getBloodsVoiceChannel() {
            const guildIdDatabase = await database.guild.getGuild("guildId");

            if (!guildIdDatabase) return;

            const getAllChannelsDatabase = await database.guild.get(guildIdDatabase, "bloodsChannelAll");

            const guild = client.guilds.cache.get(guildIdDatabase);

            if (guild) {
                const channels = guild.channels.cache;

                // Percorre todos os canais do servidor
                for (const channel of channels.values()) {
                    // Verifica se o canal é de voz
                    if (channel.type === ChannelType.GuildVoice && !getAllChannelsDatabase?.includes(channel.id)) {
                        const usersInVoiceChannel = channel.members.map((member) => member.user.id);

                        // Percore todos os usuários do Array usersInVoiceChannel
                        for (const key in usersInVoiceChannel) {
                            const userId = usersInVoiceChannel[key];

                            // Verifica quantos usuários tem no canal e adiciona os Bloods conforme a quantidade de usuários
                            if (channel.members.size === 1) {
                                const bloodsValue = randomNumber(bloodsConfig.bloodsForVoiceSize1.value1, bloodsConfig.bloodsForVoiceSize1.value2);

                                await database.user.add(userId, "bloods", bloodsValue);
                                await database.user.add(userId, "bloodsMonthlyRank", bloodsValue);
                            } else {
                                const bloodsValue = randomNumber(bloodsConfig.bloodsForVoice.value1, bloodsConfig.bloodsForVoice.value2);

                                await database.user.add(userId, "bloods", bloodsValue);
                                await database.user.add(userId, "bloodsMonthlyRank", bloodsValue);
                            }
                        }
                    }
                }
            }
        }

        // Chama a função conforme o tempo configurado
        setInterval(() => {
            getBloodsVoiceChannel();
        }, bloodsConfig.bloodsTimeVoice.seconds * 1000);
    },
});
