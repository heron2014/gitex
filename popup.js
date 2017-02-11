function messageFromBackground() {
  chrome.runtime.getBackgroundPage(function(bg) {
      renderStatus(bg.status);
  });
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  messageFromBackground();
});
