(function(win, doc) {

  var signinBtn = doc.getElementById('unauthorized');

  // doc.getElementById('authorize-button').addEventListener('click', function() {
  //   chrome.runtime.sendMessage({greeting: 'authorize_me'}, function(response) {
  //     console.log('response from background page? ', response);
  //   });
  // });
  //
  // chrome.runtime.getBackgroundPage(function(bg) {
  //   console.log('bg in popup', bg);
  // });

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
})(window, document)
