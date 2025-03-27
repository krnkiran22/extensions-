let isEnabled = true;
chrome.storage.sync.get("enabled", (data) => {
  isEnabled = data.enabled !== false;
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled) {
    isEnabled = changes.enabled.newValue;
  }
});

// Map specific keys to specific sounds
const keySoundMap = {
  "1": chrome.runtime.getURL("sounds/applause.mp3"),
  "2": chrome.runtime.getURL("sounds/bruh.mp3"),
  "3": chrome.runtime.getURL("sounds/gameover.mp3"),
  "4": chrome.runtime.getURL("sounds/sus.mp3"),
  "5": chrome.runtime.getURL("sounds/whyareyougay.mp3"),
  // You can map more keys if you want
};

document.addEventListener("keydown", (e) => {
  if (isEnabled) {
    const soundFile = keySoundMap[e.key.toLowerCase()];
    if (soundFile) {
      const audio = new Audio(soundFile);
      audio.volume = 0.7;
      audio.play();
    }
  }
});
