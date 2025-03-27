let isEnabled = true;
chrome.storage.sync.get('enabled', (data) => {
  isEnabled = data.enabled !== false;
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled) {
    isEnabled = changes.enabled.newValue;
  }
});

const soundList = [

  chrome.runtime.getURL('sounds/click2.mp3'),
  chrome.runtime.getURL('sounds/click3.mp3')
];

document.addEventListener('keydown', (e) => {
  if (isEnabled && e.key.length === 1) {
    const audio = new Audio(soundList[Math.floor(Math.random() * soundList.length)]);
    audio.volume = 0.7;
    audio.play();
  }
});
