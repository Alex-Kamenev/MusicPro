# MusicPro
A historical team project for scheduling music lessons between students and educators,
built with React Native, Expo 34, Firebase and an interactive calendar. The GitHub
repository is archived; these source maintenance changes do not revive a live service.

## Focused security maintenance

- The old unauthenticated SQL user-list endpoint is retired. `server.js` has no database
  connection, credentials, queries or user-data logging. `/user` returns HTTP 410;
  other paths return 404. The stub binds only to `127.0.0.1`, including if `HOST` is set.
- Signup and login use the user returned by the current Firebase authentication call.
  Authentication failure stops the workflow. Signup waits for the profile write before
  navigation; login reads the role once and rejects missing/unsupported profiles.
- If authentication creates an account but its profile write fails, no dashboard opens;
  the account can remain without a profile. Recovery is outside this archived demo.

With Node.js 18+ installed, `npm test` runs focused Firebase-mock and local HTTP checks.
No `npm install`, database, Firebase account, credentials or external network is needed
for these checks. They do not verify the native mobile UI or deployed Firebase rules.

`node server.js` runs only the retired local stub, normally on port 3000. `PORT` may
select an integer from 0 to 65535; 0 asks the OS for a temporary local port. Invalid
configuration and listener errors fail without printing configuration values.

## Historical mobile application

The original mobile entry point is `App.js`; the original Expo start scripts remain.
The Expo 34/React 16/Firebase 7 dependency stack and lockfile were not migrated or
certified for current mobile runtimes. Reproducing the app requires a compatible
historical toolchain. Do not use real account data or treat this as production auth.

Firebase database security rules are not included. Client-selected student/teacher
roles and navigation are not authorization; any revival must enforce access on the
service, verify the rules, review dependencies and add native end-to-end coverage.
Historical `.expo` runtime metadata is also still present in source. The maintenance
checks do not claim that a previously deployed database or service is secure.

## Authors

#### Grace Jacobs - UX/UI Designer
#### Eric Anderson - UX/UI Designer
#### Aleksander Kamenev - Front End Developer
#### Yongjie Chen - Front End Developer
#### Maksym Karunos - Github Liason, Back End Engineer
#### Alejandro Gonzalez - Lead Back End Engineer

