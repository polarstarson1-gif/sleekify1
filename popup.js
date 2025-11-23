document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggleBtn');
  
    // Load saved state
    chrome.storage.sync.get('sleekEnabled', (data) => {
      toggle.checked = !!data.sleekEnabled;
    });
  
    // Save state on change
    toggle.addEventListener('change', () => {
      const isEnabled = toggle.checked;
      chrome.storage.sync.set({ sleekEnabled: isEnabled }, () => {
        // Send message to active tab to update immediately
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {enabled: isEnabled});
        });
      });
    });
  });
