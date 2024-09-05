export function addChannelAlreadyContent(channelId: string) {
    return { content: `<:Error:1281076494994505738> O canal <#${channelId}> já esta registrado no Banco de Dados!`, ephemeral };
}

export function removeChannelNotContent(channelId: string) {
    return { content: `<:Error:1281076494994505738> O canal <#${channelId}> não esta registrado no Banco de Dados!`, ephemeral };
}
