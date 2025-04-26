import { getVoiceConnection, deleteVoiceConnection } from '../voiceConnections.js';

export default async (client, oldState, newState) => {
  const cid = oldState.channelId;
  if (cid) {
    const vc = getVoiceConnection(cid);

    if (vc) {
      const channel = await client.getChannel(cid);

      if (channel.members.size == 1) {
        deleteVoiceConnection(cid);
      }
    }
  }
};
