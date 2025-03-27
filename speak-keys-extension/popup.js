const btn = document.getElementById("toggleBtn");

chrome.storage.sync.get(["speakEnabled"], (data) => {
  const enabled = data.speakEnabled !== false;
  btn.textContent = enabled ? "Turn OFF" : "Turn ON";
});

btn.addEventListener("click", () => {
  chrome.storage.sync.get(["speakEnabled"], (data) => {
    const newValue = !(data.speakEnabled !== false);
    chrome.storage.sync.set({ speakEnabled: newValue });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: "TOGGLE_SPEAK",
        value: newValue
      });
    });
    btn.textContent = newValue ? "Turn OFF" : "Turn ON";
  });
});
