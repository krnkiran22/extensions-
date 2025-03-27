let isEnabled = true;
const toggleButton = document.getElementById("toggle");

toggleButton.addEventListener("click", () => {
  isEnabled = !isEnabled;
  chrome.storage.sync.set({ soundEnabled: isEnabled });
  chrome.runtime.sendMessage({ type: "TOGGLE_SOUND", value: isEnabled });
  toggleButton.textContent = isEnabled ? "Disable" : "Enable";
});

chrome.storage.sync.get("soundEnabled", (data) => {
  isEnabled = data.soundEnabled !== false;
  toggleButton.textContent = isEnabled ? "Disable" : "Enable";
});
