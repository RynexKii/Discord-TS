import { database } from "#database";
import { EmbedBuilder, userMention } from "discord.js";

export async function messageWelcome(userId: string, guildId: string) {
    // Importando - Banco de Dados
    let welcomeMessage = await database.guild.get(guildId, "welcomeMessage");

    if (!welcomeMessage || Array.isArray(welcomeMessage)) return;

    welcomeMessage = welcomeMessage.replace("userId", `<@${userId}>`);

    // Mensagem - Embed
    const embedWelcomeMessage = new EmbedBuilder().setDescription(welcomeMessage).setColor("Random");

    return { content: userMention(userId), embeds: [embedWelcomeMessage] };
}
