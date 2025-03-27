let isEnabled = true;
const numberSounds = {};

// Load all sounds
for (let i = 1; i <= 9; i++) {
  const audio = new Audio(chrome.runtime.getURL(`sounds/${i}.mp3`));
  audio.preload = "auto";
  numberSounds[i] = audio;
}

// Listen for keydown
document.addEventListener("keydown", (e) => {
  if (!isEnabled) return;
  if (e.key >= "1" && e.key <= "9") {
    const sound = numberSounds[e.key];
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
      sound.play().catch((err) => {
        console.warn("Sound error:", err.message);
      });
    }
  }
});

// Listen for toggle
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "TOGGLE_SOUND") {
    isEnabled = msg.value;
  }
});
