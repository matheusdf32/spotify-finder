'use strict';

if (window.location.href.includes('#')) {
  window.location.replace(window.location.href.replace('#', '?'))
}
var bgPage = chrome.extension.getBackgroundPage();
const params = new URLSearchParams({
  client_id: 'xxx', // Please dont use my id for your projects. Make your own at https://developer.spotify.com/dashboard/
  redirect_uri: 'chrome-extension://enmkcpjifodohiegdblhojapfoeopbhg/options.html?',
  response_type: 'token'
})

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('access_token');

if (token || bgPage.getToken()) {
  chrome.storage.sync.set({ 'spotify-user-token-at-YTtoSPOTIFY': token }, function () {
    console.log('spotify-user-token-at-YTtoSPOTIFY is set to ' + token);
  });
  const cutOff = (Date.now() + 60 * 60 * 1000)
  chrome.storage.sync.set({ 'spotify-user-cutOff-at-YTtoSPOTIFY': cutOff }, function () {
    console.log('spotify-user-cutOff-at-YTtoSPOTIFY is set to ' + cutOff);
  });
  document.getElementById('teste').appendChild(document.createTextNode('You are currently loged in. Enjoy. '+token))
} else {
  document.getElementById('teste').appendChild(document.createTextNode('You need to login at spotify and allow this app in order to use this extension. The session only lasts one hour.'))
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("spauthorize").addEventListener("click", () => { window.open('https://accounts.spotify.com/authorize?' + params); window.close(); });
});
