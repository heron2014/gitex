(function() {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    httpGetAsync(`https://api.github.com/users/${request.githubName}`, sendResponse, function(response) {
     if (response) {
       sendResponse({ res: JSON.parse(response).name });
     } else {
       sendResponse({ res: request.githubName });
     }
    });
    //http://stackoverflow.com/questions/20077487/chrome-extension-message-passing-response-not-sent
    return true;
  });


  function httpGetAsync(url, sendResponse, callback) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      return callback(request.responseText);
      }
    }
    request.open("GET", url, true);
    request.setRequestHeader('Accept', 'application/vnd.github.v3+json');
    request.send();
  }
}());
