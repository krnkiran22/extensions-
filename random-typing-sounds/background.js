chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ soundEnabled: true });
});
