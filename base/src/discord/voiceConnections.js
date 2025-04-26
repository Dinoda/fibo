const vcs = {};

const add = (id, voiceConnection, audioPlayer) => {
  vcs[id] = { vc: voiceConnection, ap: audioPlayer };
};

const get = (id) => {
  return vcs[id]?.vc;
};

const getPlayer = (id) => {
  return vcs[id]?.ap;
};

const del = (id) => {
  vcs[id].vc.destroy();
  vcs[id].ap.stop();

  vcs[id] = undefined;
};

export { 
  add as addVoiceConnection,
  get as getVoiceConnection,
  getPlayer as getAudioPlayer,
  del as deleteVoiceConnection,
};
