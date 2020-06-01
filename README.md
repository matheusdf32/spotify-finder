# spotify-finder
Chrome extension for finding songs in spotify via the tab open in your chrome

How to use:

#Method: Chrome Store

  Download extension at: <the extension link for chrome store is not available, the extension is being revised>

#Method: Downloading from github (too much work just for testing, don't do it unless you want to code)

  Unzip and Follow https://developer.chrome.com/extensions/getstarted#manifest to import it in chrome, you don't need to create 

  manifest.json

  After that, open options.js, you will find a json with the follow:

  ` client_id: 'xxx' `

  change 'xxx' to your Spotify client_id, you can find it at: https://developer.spotify.com/dashboard/

  Then go to spotify's dashboard and click edit preferences and add a redirect url.

  The redirect url needs to be the same as `redirect_uri` in the same options.js

  * The redirect url is the chrome's extension id, you can find it at: chrome://extensions

#And then:

  Log in to spotify by clicking the extension with your right mouse button and going to Options

  Now you just need to open a yt video with your song and click the extension, a list of songs found(limit 20) will be there.



##FAQ:

1- Why does it log off all the time?
  R: It logs off after an hour, its spotify's limitation to the auth method, without a server-secret it doesn't refresh spotify tokens. Link: https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow

2- Is it safe?
  R: Yes. Any js developer can read the code as it's open source and your data(spotify token) stays stored in your computer and doesn't go though any other website, it's direct connection between you and spotify. That is why i used the auth method discussed in FAQ-1
  
3- Why is your code ugly?
  R: I did that in a day, but that's no excuse, i will fix the code with time.
  
4- How do i report bugs and errors?
  R: Open a GH Issue as a bug or feature request(if you have an idea on how to fix it)
  
5- Can i sugest new features?
  R: I plan on maybe adding a FAV/LIKE button so you add your song directly to your spotify main playlist instead of just opening the song in a new tab. Other than that, i don't think i will add more features, but any sugestion is welcome :)
  
6- Can i contribute with code?
  R: Yes, make a change and open a Pull Request.

7- Why did you do this?
  R: Well, i needed it.
