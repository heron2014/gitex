(function() {

// second option?
// Listens for a message from popup.js. Once received opens a new window to
// authorize the user with GitHub.
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.greeting == "authorize_me"){
      console.log('request.greeting', request);
      console.log('sender', sender);
      // old key
      chrome.windows.create({'url' : 'https://github.com/login/oauth/authorize?client_id=98d3325b8a82033bca6e&scope=repo', 'width':1100, 'height':650});
      sendResponse({farewell: "authorization_sent"});
    }
  });

}());
