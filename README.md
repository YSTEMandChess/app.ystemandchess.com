# Frontend Repo for YStem and Chess Website
## Pages to Make
- ~~Mentor Dashboard~~
- ~~Contact Page~~
- Request A Mentor Page ?
- ~~Admin Dashboard [Last]~~
- ~~Donate Page~~
- ~~Not Logged In Play Page~~
- ~~Parent Stat Page~~

## Pages to Make in the Future
- Full Contact page


## Future
Make directions for building and all of the pages + give graphic of program stucture.

1. Is mentor and player paring going to be static?
2. Send mentor accounts to waiting collection and use other script to approve.
3. Allow people to delete accounts / update info about themselves.

## Communication between Backend and Frontend
- 2 Collections.
- Pair randomly for waiting.
- Send mentor accounts to waiting collection and use other script to approve.

## Scripts to Write
- Given a jwt, and a status add them to either the mentor or student waiting dashboard.
  - `if role == ready, then keep / add them to the collection`
  - `else remove them from the collection`
- Look into recording api software / possible Jitsi alternative.
  - If using Jitsi, given a filename, download it from the dropbox database / add filelink to mongodb (Do Parents need to watch this as well?)
- Scripts for Signing Up and Loggin in.
- Script to create new meeting given 2 jwts. Create jitsi meeting / create lichess game / pair opponents.
- ~~Given a JWT of a parent, return data of the student(s)~~
- Given a JWT and Query, return all matches of students and mentors. [Admin page]
- Given a JWT, return all data regarding students of that mentor ?
1. ~~No longer am looking for match. JWT.~~
2. ~~End Meeting Script that sets Ongoing = false: JWT.~~
3. ~~Check if meeting exists function and returns meeting info.~~ [Still need to Create Actual Meeting in Lichess]

