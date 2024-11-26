// content.js

// Check if this script is already running on the page
if (!window._eco_extension_script_run) {
  window._eco_extension_script_run = true;

  // You can modify the webpage content here.
  // Example 1: Change the background color of the page
  document.body.style.backgroundColor = "#f0f8ff"; // Light cyan background

  // Example 2: Add a message to the page
  const messageElement = document.createElement('div');
  messageElement.style.position = 'fixed';
  messageElement.style.top = '10px';
  messageElement.style.left = '10px';
  messageElement.style.padding = '10px';
  messageElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  messageElement.style.color = '#fff';
  messageElement.style.fontSize = '16px';
  messageElement.style.borderRadius = '5px';
  messageElement.innerText = 'ECO Extension is running on this page!';
  document.body.appendChild(messageElement);

  // Example 3: Change all images to grayscale (for demo purposes)
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.style.filter = 'grayscale(100%)';
  });

  // Log a message to the console
  console.log('ECO Extension content script executed!');
}
