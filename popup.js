// popup.js

// Get the button from the popup
const toggleButton = document.getElementById('toggleButton');

// Add event listener for button click
toggleButton.addEventListener('click', () => {
  // Get the current state of the extension from chrome.storage
  chrome.storage.sync.get(['ecoExtensionActive'], (result) => {
    const isActive = result.ecoExtensionActive;

    // Toggle the state (active <-> inactive)
    const newState = !isActive;

    // Update the state in chrome.storage
    chrome.storage.sync.set({ ecoExtensionActive: newState }, () => {
      // Change the button text based on the new state
      toggleButton.textContent = newState ? 'Deactivate ECO Extension' : 'Activate ECO Extension';

      // Notify the background script to activate or deactivate the extension
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0].id;
        if (newState) {
          // Activate the extension on the current tab
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: activateEcoExtension,
          });
        } else {
          // Deactivate the extension on the current tab
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: deactivateEcoExtension,
          });
        }
      });
    });
  });
});

// Function to activate the ECO Extension (same as background.js)
function activateEcoExtension() {
  document.body.style.backgroundColor = "#f0f8ff"; // Light cyan background
  console.log('ECO Extension activated on this page!');
}

// Function to deactivate the ECO Extension (same as background.js)
function deactivateEcoExtension() {
  document.body.style.backgroundColor = ""; // Reset background
  console.log('ECO Extension deactivated on this page.');
}

// Set initial button text based on current state
chrome.storage.sync.get(['ecoExtensionActive'], (result) => {
  const isActive = result.ecoExtensionActive;
  toggleButton.textContent = isActive ? 'Deactivate ECO Extension' : 'Activate ECO Extension';
});
