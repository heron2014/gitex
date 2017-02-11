(function() {
  // Update the relevant fields with the new data
  console.log('popup');
  function updateDOM(collection) {
    document.getElementById('githubName').textContent = collection.githubName;
  }

  // Once the DOM is ready...
  window.addEventListener('DOMContentLoaded', function () {
    // ...query for the active tab...
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      // send a request for the DOM collections, specify a callback to be called from the receiving end(content script)
      chrome.tabs.sendMessage(tabs[0].id, {from: 'popup', subject: 'DOMCollection'}, updateDOM);
    });
  });


  //
  // function messageFromBackground() {
  //   chrome.runtime.getBackgroundPage(function(bg) {
  //       renderStatus(bg.status);
  //   });
  // }
  //
  // function renderStatus(statusText) {
  //   document.getElementById('status').textContent = statusText;
  // }
  //
  // document.addEventListener('DOMContentLoaded', function() {
  //   messageFromBackground();
  // });
}())
