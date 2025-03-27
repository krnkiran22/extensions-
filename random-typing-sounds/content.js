const keySoundMap = {
  "1": chrome.runtime.getURL("sounds/sound1.mp3"),
  "2": chrome.runtime.getURL("sounds/sound2.mp3"),
  "3": chrome.runtime.getURL("sounds/sound3.mp3"),
  "4": chrome.runtime.getURL("sounds/sound4.mp3"),
  "5": chrome.runtime.getURL("sounds/sound5.mp3"),
  "a": chrome.runtime.getURL("sounds/sound1.mp3"),
  "b": chrome.runtime.getURL("sounds/sound2.mp3"),
  "c": chrome.runtime.getURL("sounds/sound3.mp3"),
  "d": chrome.runtime.getURL("sounds/sound4.mp3"),
  "e": chrome.runtime.getURL("sounds/sound5.mp3")
};

let isEnabled = localStorage.getItem("keySoundEnabled") !== "false";

window.addEventListener("storage", (event) => {
  if (event.key === "keySoundEnabled") {
    isEnabled = event.newValue !== "false";
  }
});

document.addEventListener("keypress", (e) => {
  if (!isEnabled) return;
  const sound = keySoundMap[e.key.toLowerCase()];
  if (sound) {
    const audio = new Audio(sound);
    audio.volume = 0.7;
    audio.play();
  }
});
