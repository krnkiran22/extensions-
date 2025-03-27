let isEnabled = true;
chrome.storage.sync.get("enabled", (data) => {
  isEnabled = data.enabled !== false;
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled) {
    isEnabled = changes.enabled.newValue;
  }
});

const soundFiles = [
  chrome.runtime.getURL("sounds/bruh.mp3"),
  chrome.runtime.getURL("sounds/applause.mp3"),
  chrome.runtime.getURL("sounds/gameover.mp3")
];

document.addEventListener("keypress", () => {
  if (isEnabled) {
    const audio = new Audio(soundFiles[Math.floor(Math.random() * soundFiles.length)]);
    audio.volume = 0.7;
    audio.play();
  }
});
