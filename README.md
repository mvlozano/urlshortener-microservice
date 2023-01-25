
# API Project: URL Shortener for FCC
[![Run on Repl.it](https://repl.it/badge/github/freeCodeCamp/boilerplate-project-timestamp)](https://exercise-tracker.andradeoromulo.repl.co)

## About
My solution for the [URL Shortener Microservice challenge](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice) for the freeCodeCamp API and Microservice certification. It was built based on the boilerplate available [here](https://github.com/freeCodeCamp/boilerplate-project-urlshortener/).

## Technologies
A little bit of what's inside the project:
- **Node.js** and **Express** to create the server and handle routes, requests and responses.
- **Mongoose** to persist all the data.

## Endpoints:

Endpoints | Description | Params
----------|-------------|-------------
GET `/api/shorturl/:url` | Redirects the user to the original url which has been shortened to the value of the url parameter | *url
POST `/api/shorturl` | Given a posted url via request body, creates a short representation of it and save and returns (a json with) both values | url* (via body)

#### Example output:
* `{"_id":"5fda1383bb165d0493ae9427","username":"testUser"}`
* `[{"_id":"5fda1383bb165d0493ae9427","username":"testUser","log":[{"description":"testExercise","duration":15,"date":"2020-12-16T14:04:10.761Z"}],"count":1}]`

## How to use:
Be sure to change the `uri` variable in `database.js` according to your own MongoDB server. It's also possible to just create a `.env` file and store this information there in order to keep it hidden and safe. Then, just run on terminal:
```
npm install
npm start
```

## Feedback
I'm a student and I really would like to hear case you have any tips, correction suggestions or comments about any my of projects (🤓).

