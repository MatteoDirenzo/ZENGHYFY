# My-First-Spotify

# description
A clone of Spotify, but the application let you discover more about your music and your playlists.

it works fine on desktop, on mobile needs more work for responsiveness.

V1.0

# instructions
Before starting, keep in mind the application works on localhost:3000, in order to change the localhost's port you have to replace in file server/server.js
the line 15 with your prefered port.
(you'll need to write it also in the "redirect uri" on the spotify and genius online site)

1. Open the folder with your code editor
2. Navigate to https://genius.com/api-clients (log in or sign up).
3. Register your app on the website, insert a name (whatever you want),
  in "app website url" insert the localhost (http://localhost:3000 written like this).
4. Generate an accessToken and paste it in server/server.js line 10 beetween the " ".
5. Navigate to https://developer.spotify.com/dashboard/,
  log in with your spotify account (you have to be a premium member).
6. Click "create an app" on the top-right corner, give it a name, 
  it will redirect you to the dashboard page of the application.
7. In the dashboard click "Settings" and in the filed "redirect's uri" paste your localhost (http://localhost:3000 written like this).
8. Close the settings and copy the client_id, paste it in server/server.js line 13 between the " ".
9. Copy the client_id also in react-prova/src/App.js line 11 between the " ".
10. Click "show client secret" copy and paste it in server/server.js line 14 between the " ".
11. Open the terminal (ctrl + j) and run `cd server`
12. After run this command `npm install`
13. Run ` npm run devStart` and let the terminal go
14. Open a new terminal 
15. Run `cd react-prova`
16. Run this command `npm install`
17. Run `npm run start`
18. Your app will open up in the browser (or search for localhost: in the searchbar if it doesn't automatic show)


# License
MIT License

Copyright (c) 2021 Matteo Direnzo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
