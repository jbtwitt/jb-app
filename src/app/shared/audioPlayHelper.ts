export const audioPlayHelper = {

  play: (sound, loop: boolean=false) => {
    if (sound) {
      sound.loop = loop;
      sound.play();
    }
  },
  stop: (sound) => {
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }
}
