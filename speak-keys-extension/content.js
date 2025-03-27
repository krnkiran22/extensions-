let isEnabled = true;
const audioBuffers = {};
const ctx = new (window.AudioContext || window.webkitAudioContext)();

chrome.storage.sync.get('enabled', (data) => {
  isEnabled = data.enabled !== false;
  preloadSounds();
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled) {
    isEnabled = changes.enabled.newValue;
  }
});

const keysToPreload = [...'abcdefghijklmnopqrstuvwxyz0123456789 ', 'Enter', 'Backspace'];

async function preloadSounds() {
  for (const key of keysToPreload) {
    const utterance = new SpeechSynthesisUtterance(key === ' ' ? 'Space' : key);
    utterance.lang = 'en-US';
    utterance.rate = 1.5;
    utterance.pitch = 1;

    const synth = window.speechSynthesis;
    const blob = await speakToBlob(utterance);
    const arrayBuffer = await blob.arrayBuffer();
    audioBuffers[key] = await ctx.decodeAudioData(arrayBuffer);
  }
}

function speakToBlob(utterance) {
  return new Promise((resolve) => {
    const mediaStream = new MediaStream();
    const mediaRecorder = new MediaRecorder(mediaStream);
    let chunks = [];

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = () => resolve(new Blob(chunks));

    const audio = new Audio();
    const synth = window.speechSynthesis;
    synth.speak(utterance);

    mediaRecorder.start();
    setTimeout(() => mediaRecorder.stop(), 200);
  });
}

function playBuffer(key) {
  const buffer = audioBuffers[key];
  if (buffer) {
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
  }
}

document.addEventListener('keypress', (e) => {
  if (isEnabled) {
    let key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === ' ') key = ' ';
    if (audioBuffers[key]) {
      playBuffer(key);
    }
  }
});
