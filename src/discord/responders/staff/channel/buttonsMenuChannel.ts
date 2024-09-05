import { Responder, ResponderType } from "#base";
import { addChannelMessage, removeChannelMessage } from "#messages/*";

// Botão de Adicionar
new Responder({
    customId: "button/menu/channel/add",
    type: ResponderType.Button,
    cache: "cached",
    async run(interaction) {
        await interaction.update(addChannelMessage());
    },
});

// Botão de Remover
new Responder({
    customId: "button/menu/channel/remove",
    type: ResponderType.Button,
    cache: "cached",
    async run(interaction) {
        await interaction.update(removeChannelMessage());
    },
});
