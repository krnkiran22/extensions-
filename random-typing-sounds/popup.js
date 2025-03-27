const toggleBtn = document.getElementById("toggle");

chrome.storage.sync.get("enabled", (data) => {
  toggleBtn.textContent = data.enabled === false ? "Turn ON" : "Turn OFF";
});

toggleBtn.addEventListener("click", () => {
  chrome.storage.sync.get("enabled", (data) => {
    const newState = data.enabled === false;
    chrome.storage.sync.set({ enabled: newState });
    toggleBtn.textContent = newState ? "Turn OFF" : "Turn ON";
  });
});
