# Part 1 - answers

Read the Express documentation (https://expressjs.com/en/5x/api.html) and answer in your own words.

## 1. What is inside the request object (`req`)?

The `req` object represents the HTTP request that the client sent to the server. It contains all the information about that request:
- `req.params` - route parameters from the URL (for example `:name` in `/greet/:name`).
- `req.query` - values from the query string (for example `?type=single`).
- `req.body` - the data sent in the request body (available after `app.use(express.json())`).
- `req.headers` - the request headers (for example `Content-Type`).
- `req.method` - the HTTP method (GET, POST, PUT, DELETE...).
- `req.path` / `req.url` - the path that was requested.

## 2. What is inside the response object (`res`)?

The `res` object is what the server uses to send an answer back to the client. It has methods such as:
- `res.json()` - sends a JSON response.
- `res.send()` - sends a response (text, HTML, etc.).
- `res.status()` - sets the HTTP status code (for example 400 or 404).
- `res.set()` - sets response headers.
- `res.redirect()` - redirects the client to another URL.
- `res.sendFile()` - sends a file.

## 3. What does `app.use()` do?

`app.use()` adds middleware to the app. Middleware is a function that runs on every incoming request (or only on requests to a specific path) before the request reaches the route handler. It is used for things like parsing the body, logging, or checking authentication. For example, `app.use(express.json())` reads the JSON body of the request and puts it in `req.body`.