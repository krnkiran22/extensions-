let isEnabled = true;

chrome.storage.sync.get(["speakEnabled"], (data) => {
  isEnabled = data.speakEnabled !== false;
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "TOGGLE_SPEAK") {
    isEnabled = msg.value;
  }
});

document.addEventListener("keydown", (e) => {
  if (!isEnabled) return;
  speakLetter(e.key);
});

function speakLetter(key) {
  const utter = new SpeechSynthesisUtterance(key);
  utter.rate = 2.5; // fast
  utter.pitch = 1;
  speechSynthesis.speak(utter);
}
