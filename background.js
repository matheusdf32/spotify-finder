
'use strict';

let songList
function getSongList() {
  return songList
}
function setSongList(newSL) {
  songList = newSL
  return true
}

let token
function getToken() {
  return token
}
function setToken(newToken) {
  token = newToken
  return true
}

chrome.tabs.onActivated.addListener(async function (tabId, changeInfo, tab) {

  chrome.storage.sync.get(['spotify-user-token-at-YTtoSPOTIFY'], function (result) {
    setToken(result['spotify-user-token-at-YTtoSPOTIFY'])
  });

  chrome.storage.sync.get(['spotify-user-cutOff-at-YTtoSPOTIFY'], function (result) {
    if (result['spotify-user-cutOff-at-YTtoSPOTIFY'] <= Date.now()) {
      chrome.storage.sync.set({ 'spotify-user-token-at-YTtoSPOTIFY': null }, function () {
        console.log('spotify-user-token-at-YTtoSPOTIFY is set to ' + null);
        setToken(null)
      });
    }
  });

  const link = await chrome.tabs.getSelected(null, function (tab) {
    if (!tab.url.includes('https://www.youtube.')) return songList = []
    fetch('https://noembed.com/embed?url=' + tab.url).then(r => r.text()).then(result => {
      const info = JSON.parse(result)
      const params = new URLSearchParams({
        'q': info.title.replace(/\([^)]*\)*|\[[^\]]*\]*|\&*/g, "").replace("ft.", '').replace("feature", '').replace("featured", ''), type: 'track'
      })
      const options = { method: 'GET', headers: { 'Authorization': 'Bearer ' + token } }

      fetch('https://api.spotify.com/v1/search?' + params, options).then(r => r.text()).then(result => { // https://api.spotify.com/v1/search?query=tania+bowra&offset=0&limit=5&type=artist,track,album
        const info = JSON.parse(result)
        if (info && info.tracks && info.tracks.items) {
          songList = info.tracks.items
        }

      })

    })
  });

});

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {

  chrome.storage.sync.get(['spotify-user-token-at-YTtoSPOTIFY'], function (result) {
    setToken(result['spotify-user-token-at-YTtoSPOTIFY'])
  });

  chrome.storage.sync.get(['spotify-user-cutOff-at-YTtoSPOTIFY'], function (result) {
    if (result['spotify-user-cutOff-at-YTtoSPOTIFY'] <= Date.now()) {
      chrome.storage.sync.set({ 'spotify-user-token-at-YTtoSPOTIFY': null }, function () {
        console.log('spotify-user-token-at-YTtoSPOTIFY is set to ' + null);
        setToken(null)
      });
    }
  });

  const link = await chrome.tabs.getSelected(null, function (tab) {
    if (!tab.url.includes('https://www.youtube.')) return songList = []
    fetch('https://noembed.com/embed?url=' + tab.url).then(r => r.text()).then(result => {
      const info = JSON.parse(result)
      const params = new URLSearchParams({
        'q': info.title.replace(/\([^)]*\)*|\[[^\]]*\]*|\&*/g, "").replace("ft.", '').replace("feature", '').replace("featured", ''), type: 'track'
      })
      const options = { method: 'GET', headers: { 'Authorization': 'Bearer ' + token } }

      fetch('https://api.spotify.com/v1/search?' + params, options).then(r => r.text()).then(result => { // https://api.spotify.com/v1/search?query=tania+bowra&offset=0&limit=5&type=artist,track,album
        const info = JSON.parse(result)
        songList = info.tracks.items

      })

    })
  });

});