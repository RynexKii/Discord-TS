import { settings } from "#settings";

export function addChannelAlreadyContent(channelId: string) {
    return { content: `${settings.emojis.static.error} O canal <#${channelId}> já esta registrado no Banco de Dados!`, ephemeral };
}

export function removeChannelNotContent(channelId: string) {
    return { content: `${settings.emojis.static.error} O canal <#${channelId}> não esta registrado no Banco de Dados!`, ephemeral };
}
