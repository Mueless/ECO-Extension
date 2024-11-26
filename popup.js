// popup.js

// Get elements
const scriptInput = document.getElementById('scriptInput');
const runScriptButton = document.getElementById('runScriptButton');

// When the user clicks the "Run Script" button
runScriptButton.addEventListener('click', () => {
  const userScript = scriptInput.value; // Get the script entered by the user

  if (userScript) {
    // Store the user script for later use (optional)
    chrome.storage.sync.set({ userScript: userScript }, () => {
      console.log('User script saved!');
    });

    // Inject and execute the user script on the current page
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;

      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: runUserScript,
        args: [userScript], // Pass the user script to the function
      });
    });
  } else {
    alert('Please enter a script!');
  }
});

// Function to run the user script on the current page
function runUserScript(userScript) {
  try {
    // Evaluate and run the user's script
    eval(userScript);
    console.log('User script executed!');
  } catch (error) {
    console.error('Error running user script:', error);
  }
}
