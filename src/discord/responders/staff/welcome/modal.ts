import { Responder, ResponderType } from "#base";
import { database } from "#database";
import { menuWelcomeMessage } from "#messages";

new Responder({
    customId: "modal/menu/welcome/message",
    type: ResponderType.Modal,
    cache: "cached",
    async run(interaction) {
        const guildId = interaction.guildId;
        const modaWelcomeMessage = interaction.fields.getTextInputValue("welcomeMessage");

        await interaction.deferUpdate();

        await database.guild.set(guildId, "welcomeMessage", modaWelcomeMessage);

        await interaction.editReply(await menuWelcomeMessage(guildId));
    },
});
