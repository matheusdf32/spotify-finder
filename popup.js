// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var bgPage = chrome.extension.getBackgroundPage();

function tableCreate() {
  let songList = bgPage.getSongList()
  var body = document.getElementsByTagName('body')[0];
  var tbl = document.createElement('table');
  tbl.style.width = '100%';
  tbl.setAttribute('border', '0');
  var tbdy = document.createElement('tbody');
  for (var i = 0; i < songList.length; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < 2; j++) {
      if (j & 1) {
        // ODD - impar
        var td = document.createElement('td');
        var a = document.createElement("a");
        a.appendChild(document.createTextNode(songList[i].name))
        a.href = songList[i].external_urls.spotify
        td.appendChild(a)
        tr.appendChild(td)
      }
      else {
        // EVEN - par
        var td = document.createElement('td');
        var img = document.createElement("img");
        img.src = songList[i].album.images[2].url;
        td.appendChild(img)
        tr.appendChild(td)
      }

      // }
    }
    tbdy.appendChild(tr);
  }
  tbl.appendChild(tbdy);
  body.appendChild(tbl)
}


chrome.storage.sync.get(['spotify-user-cutOff-at-YTtoSPOTIFY'], function (result) {
  if (result['spotify-user-cutOff-at-YTtoSPOTIFY'] <= Date.now()) {
    chrome.storage.sync.set({ 'spotify-user-token-at-YTtoSPOTIFY': null }, function () {
      console.log('spotify-user-token-at-YTtoSPOTIFY is set to ' + null);
    });
    var body = document.getElementsByTagName('body')[0];
    var p = document.createElement('p')
    p.appendChild(document.createTextNode('Your login has expired, please Login. Right mouse click the extension and go to Options.'))
    body.appendChild(p)
  } else {
    tableCreate();
  }
});

document.addEventListener('DOMContentLoaded', function () {
  for (const anchor of document.getElementsByTagName('a')) {
    anchor.onclick = () => {
      chrome.tabs.create({ active: true, url: anchor.href });
    };
  };
});

