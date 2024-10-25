export interface GuildSetData {
    guildId: string;
    guildName: string | null;
    guildIconUrl: string | null;
    welcomeMessage: string | null;
    welcomeChannel: string | null;
    welcomeChannelLogs: string | null;
}

export interface GuildGetFirstData {
    guildId: string;
    guildName: string | null;
    guildIconUrl: string | null;
}
