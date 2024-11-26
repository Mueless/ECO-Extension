// background.js

chrome.runtime.onInstalled.addListener(() => {
  console.log('ECO Extension installed!');
  
  // Set default settings or data if needed (using chrome.storage)
  chrome.storage.sync.set({ ecoExtensionActive: true }, () => {
    console.log('ECO Extension is active by default.');
  });
});

// Listen for browser actions or events, for example, when the user clicks on the extension's icon
chrome.action.onClicked.addListener((tab) => {
  console.log('ECO Extension icon clicked!');

  // Toggle a feature or script, for example, enable or disable the extension
  chrome.storage.sync.get(['ecoExtensionActive'], (result) => {
    const isActive = result.ecoExtensionActive;

    // Toggle the state
    const newState = !isActive;

    // Update the storage with the new state
    chrome.storage.sync.set({ ecoExtensionActive: newState }, () => {
      console.log(`ECO Extension is now ${newState ? 'active' : 'inactive'}.`);

      // Optionally, inject content scripts based on state
      if (newState) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: activateEcoExtension,
        });
      } else {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: deactivateEcoExtension,
        });
      }
    });
  });
});

// Function to activate the ECO Extension
function activateEcoExtension() {
  document.body.style.backgroundColor = "#f0f8ff"; // Light cyan background
  console.log('ECO Extension activated on this page!');
}

// Function to deactivate the ECO Extension
function deactivateEcoExtension() {
  document.body.style.backgroundColor = ""; // Reset background
  console.log('ECO Extension deactivated on this page.');
}
