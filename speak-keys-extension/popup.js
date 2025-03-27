const toggleButton = document.getElementById('toggle');

chrome.storage.sync.get('enabled', (data) => {
  updateButton(data.enabled !== false);
});

toggleButton.addEventListener('click', () => {
  chrome.storage.sync.get('enabled', (data) => {
    const newValue = !data.enabled;
    chrome.storage.sync.set({ enabled: newValue });
    updateButton(newValue);
  });
});

function updateButton(enabled) {
  toggleButton.textContent = enabled ? 'Turn OFF' : 'Turn ON';
  toggleButton.style.backgroundColor = enabled ? '#4CAF50' : '#f44336';
  toggleButton.style.color = 'white';
}
