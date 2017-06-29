(function() {
  var data = {};
  var headerNAv = document.getElementsByClassName('header-nav')[1];
  if (headerNAv) {
    var imgAlt = headerNAv.querySelector('img').getAttribute('alt');
    var githubName = imgAlt.substring(1);
  }
  chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    // First, validate the message's structure
    if ((msg.from === 'popup') && (msg.subject === 'DOMCollection')) {
      // Collect the necessary data

      var collection = {
        githubName: data.name,
      };
      console.log('response', collection);
      // Directly respond to the sender (popup),
      // through the specified callback */
      response(collection);
    }
  });

  chrome.runtime.sendMessage({from: 'content', subject: 'showPageAction', githubName: githubName}, function (response) {
    data.name = 'Anita2';
  });
}());
